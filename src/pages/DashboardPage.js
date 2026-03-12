import { DashboardLocators } from "../locators/dashboard_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { logger } from "../helpers/logger.js";

/**
 * Page Object representing the SauceLab Dashboard page.
 * Handles interactions with products and cart navigation.
 *
 * @extends BasePage
 */
export class DashboardPage extends BasePage {
  constructor(page) {
    super(page);
    this.dashboardLocators = new DashboardLocators();
  }

  /**
   * Retrieves all products displayed on the dashboard.
   *
   * @returns {Promise<Array<{name: string, price: number}>>}
   * Array containing product name and price
   */
  async getAllProducts() {
    logger.info("Retrieving all products from the dashboard");

    try {
      const products = [];
      const items = await this.getAllElements(this.dashboardLocators.allProducts);

      logger.info(`Found ${items.length} products on the page`);

      for (const item of items) {
        const name = await this.getElementText(
          item.locator(this.dashboardLocators.productName)
        );

        const priceText = await this.getElementText(
          item.locator(this.dashboardLocators.productPrice)
        );

        const price = parseFloat(priceText.replace("$", "").trim());

        products.push({
          name: name.trim(),
          price: price
        });

        logger.info(`Product found -> Name: ${name.trim()}, Price: $${price}`);
      }

      logger.info("Finished retrieving product list");

      return products;

    } catch (error) {
      logger.error(`Failed to retrieve products: ${error.message}`);
      throw error;
    }
  }

  /**
   * Selects a random product from the dashboard and adds it to the cart.
   *
   * @returns {Promise<{name: string, price: number, button: import('@playwright/test').Locator}>}
   * Object containing the selected product name, price and its button locator
   */
  async addRandomProductToCart() {
    try {
      const items = await this.getAllElements(this.dashboardLocators.allProducts);

      if (items.length === 0) {
        throw new Error("No 'Add to cart' buttons found");
      }

      const randomIndex = Math.floor(Math.random() * items.length);
      const item = items[randomIndex];

      const name = await this.getElementText(
        item.locator(this.dashboardLocators.productName)
      );

      const priceText = await this.getElementText(
        item.locator(this.dashboardLocators.productPrice)
      );

      const button = item.locator(this.dashboardLocators.addToCartButton);

      const price = parseFloat(priceText.replace("$", "").trim());

      logger.info(`Selected product -> Name: ${name}, Price: $${price}`);

      await this.clickElement(button);

      logger.info(`Product "${name}" added to the cart`);

      return {
        name,
        price,
        button
      };
    } catch (error) {
      logger.error(`Failed to add random product to cart: ${error.message}`);
      throw error;
    }
  }

  /**
   * Navigates to the cart page from the dashboard.
   *
   * @returns {Promise<void>}
   */
  async goToCart() {
    logger.info("Navigating to cart page");

    try {
      await this.clickElement(this.dashboardLocators.cartIcon);
      logger.info("Cart page opened successfully");

    } catch (error) {
      logger.error(`Failed to navigate to cart: ${error.message}`);
      throw error;
    }
  }
}