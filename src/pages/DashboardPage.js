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

  async getProductData(item) {
    const name = await this.getElementText(
      item.locator(this.dashboardLocators.productName)
    );

    const priceText = await this.getElementText(
      item.locator(this.dashboardLocators.productPrice)
    );

    return {
      name: name.trim(),
      price: this.parsePrice(priceText)
    };
  }

  parsePrice(priceText) {
    return parseFloat(priceText.replace("$", "").trim());
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
        products.push(await this.getProductData(item));
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
  async getRandomProduct() {
    try {
      const items = await this.getAllElements(this.dashboardLocators.allProducts);

      if (items.length === 0) {
        throw new Error("No 'Add to cart' buttons found");
      }

      const randomIndex = Math.floor(Math.random() * items.length);
      const item = items[randomIndex];

      const data = await this.getProductData(item);

      return {
        ...data,
        item
      };
    } catch (error) {
      logger.error(`Failed to add random product to cart: ${error.message}`);
      throw error;
    }
  }

  async addProductToCart(product) {
    const button = product.item.locator(this.dashboardLocators.addToCartButton);
    await this.clickElement(button);
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