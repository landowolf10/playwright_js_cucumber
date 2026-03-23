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

  async getCartItems() {
    return await this.getAllElements(this.cartLocators.cartItems);
  }

  async getCartItemsCount() {
    return await this.page.locator(this.cartLocators.cartItems).count();
  }

  /**
   * Clicks the remove button to delete the product from the cart.
   *
   * @returns {Promise<void>}
   */
  async removeFirstItem() {
    const items = await this.getCartItems();

    if (items.length === 0) {
      throw new Error("No items in cart to remove");
    }

    const firstItem = items[0];
    const removeButton = firstItem.locator(this.cartLocators.removeButton);

    await this.clickElement(removeButton);
    await firstItem.waitFor({ state: "detached" });
    logger.info("Product removed from cart");
  }

  /**
   * Verifies that cart elements are removed after deleting the product.
   *
   * @returns {Promise<void>}
   * @throws {Error} If cart elements are still visible
   */
  async isCartEmpty() {
    logger.info("Verifying that cart elements are removed");
    const items = await this.getCartItems();
    return items.length === 0;
  }
}