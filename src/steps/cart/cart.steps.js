import { Given, When, Then } from "@cucumber/cucumber";
import { logger } from "../../helpers/logger.js";

Given("I have a product in the cart", async function () {
    logger.info(`[${this.browserName}] Ensuring product exists in cart`);

    const product = await this.dashboardPage.getRandomProduct();
    await this.dashboardPage.addProductToCart(product);

    this.selectedProduct = product;
});

Then("the cart should contain {int} item", async function (expectedCount) {
    logger.info(`[${this.browserName}] Validating cart contains ${expectedCount} item`);

    await this.dashboardPage.goToCart(); // navegación implícita dentro del step

    const count = await this.cartPage.getCartItemsCount();

    if (count !== expectedCount) {
        throw new Error(`Expected ${expectedCount} item, but found ${count}`);
    }
});

When("I remove the product from the cart", async function () {
    logger.info(`[${this.browserName}] Removing product from cart`);

    await this.dashboardPage.goToCart();

    await this.cartPage.removeFirstItem();
});

Then("the cart should be empty", async function () {
    logger.info(`[${this.browserName}] Validating cart is empty`);

    const count = await this.cartPage.getCartItemsCount();

    if (count !== 0) {
        throw new Error(`Cart is not empty. Found ${count} item(s)`);
    }
});