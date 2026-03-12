import { CartLocators } from "../locators/cart_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { logger } from "../helpers/logger.js";

/**
 * Page Object representing the Cart page.
 * Handles validations and actions related to products in the cart.
 *
 * @extends BasePage
 */
export class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.cartLocators = new CartLocators(page);
  }

  /**
   * Validates that the cart elements are visible and action buttons are enabled.
   *
   * @returns {Promise<void>}
   * @throws {Error} If any element is not visible or button is not enabled
   */
  async assertButtonsAreEnabled() {
    logger.info("Validating cart elements visibility and button states");


    try {
      await this.waitForVisible(this.cartLocators.itemDescription);
      logger.info("Item description is visible");

      await this.waitForVisible(this.cartLocators.quantity);
      logger.info("Item quantity is visible");

      await this.waitForEnabled(this.cartLocators.removeButton);
      logger.info("Remove button is enabled");

      await this.waitForEnabled(this.cartLocators.checkoutButton);
      logger.info("Checkout button is enabled");

      await this.waitForEnabled(this.cartLocators.continueButton);
      logger.info("Continue shopping button is enabled");

    } catch (error) {
      logger.error(`Error validating cart buttons: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clicks the remove button to delete the product from the cart.
   *
   * @returns {Promise<void>}
   */
  async clickRemoveButton() {
    logger.info("Clicking remove button to delete product from cart");

    try {
      await this.clickElement(this.cartLocators.removeButton);
      logger.info("Product removed from cart");

    } catch (error) {
      logger.error(`Error clicking remove button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Verifies that cart elements are removed after deleting the product.
   *
   * @returns {Promise<void>}
   * @throws {Error} If cart elements are still visible
   */
  async verifyElementsRemoved() {
    logger.info("Verifying that cart elements are removed");

    try {
      await this.waitForHidden(this.cartLocators.quantity);
      logger.info("Product quantity element is no longer visible");

    } catch (error) {
      logger.error(`Cart element was not removed: ${error.message}`);
      throw error;
    }
  }
}