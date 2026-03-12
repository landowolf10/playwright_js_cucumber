import { expect } from "@playwright/test";
import { TIMEOUTS } from "../config/constants.js";
//import { logger } from "../helpers/logger.js";

export class BasePage {
  constructor(page) {
    this.page = page;
  }

  //Returns a specific locator to handle it.
  getLocator(locator) {
    if (typeof locator === "string") {
      return this.page.locator(locator);
    }

    return locator;
  }

  //Waits until an element/locator is visible given an amount of time.
  async waitForVisible(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    //logger.info(`Waiting for element visible: ${locator}`);

    await element.waitFor({
      state: "visible",
      timeout
    });
  }

   //Waits until an element/locator is hidden given an amount of time.
  async waitForHidden(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    //logger.info(`Waiting for element hidden: ${locator}`);

    await element.waitFor({
      state: "hidden",
      timeout
    });

  }

   //Waits until an element/locator is enabled given an amount of time.
  async waitForEnabled(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);
    await expect(element).toBeEnabled({ timeout });
  }

  //Returns all the elements of a given locator given an amount of time.
  async getAllElements(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    await element.first().waitFor({
      state: "visible",
      timeout
    });

    return await element.all();
  }

  //Returns a single element of a given locator given an amount of time.
  async getElement(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    await element.first().waitFor({
      state: "visible",
      timeout
    });

    return await element;
  }

  //Waits for an element/locator to be visible given an amount of time and sends text to it if found. 
  async writeText(locator, text, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    //logger.info(`Writing text into element: ${locator}`);

    await element.waitFor({
      state: "visible",
      timeout
    });

    await element.fill(text);

  }

  //Waits for an element/locator to be visible given an amount of time and clicks it if found. 
  async clickElement(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    //logger.info(`Clicking element: ${locator}`);

    await element.waitFor({
      state: "visible",
      timeout
    });

    await element.click();

  }

  //Waits for an element/locator to be visible given an amount of time 
  // and gets its text if found or returns "" if not found. 
  async getElementText(locator, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    await element.waitFor({
      state: "visible",
      timeout
    });

    const text = await element.textContent();

    //logger.info(`Element text: ${text}`);

    return text ?? "";
  }

  ////Waits for a dropdown to be visible given an amount of time 
  // and handles dropdown (selects option from dropdown).
  async selectDropdownOption(locator, option, timeout = TIMEOUTS.short) {
    const element = this.getLocator(locator);

    //logger.info(`Selecting dropdown option: ${option}`);

    await element.waitFor({
      state: "visible",
      timeout
    });

    await element.selectOption(option);
  }

  //Scrolls to an specific element/locator.
  async scrollToElement(locator) {
    const element = this.getLocator(locator);

    //logger.info(`Scrolling to element: ${locator}`);

    await element.scrollIntoViewIfNeeded();
  }

  //Takes screenshot if something fails and saves a .png file.
  async takeScreenshot(name) {
    //logger.info(`Taking screenshot: ${name}`);

    await this.page.screenshot({
      path: `reports/screenshots/${name}.png`
    });

  }
}