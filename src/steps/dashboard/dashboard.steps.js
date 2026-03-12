import { When, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import { logger } from "../../helpers/logger.js";;

Then("all products should be displayed with valid name and price", async function () {
    logger.info(`[${this.browserName}] Validating all products on dashboard`);

    const products = await this.dashboardPage.getAllProducts();

    expect(products.length, "No products were found on the dashboard").toBeGreaterThan(0);

    for (const product of products) {
        expect(
            product.name,
            `Product name is missing for product: ${JSON.stringify(product)}`
        ).toBeTruthy();

        expect(
            product.price,
            `Invalid price for product "${product.name}"`
        ).toBeGreaterThan(0);
    }
});

When("I add a random product to the cart", async function () {
    logger.info(`[${this.browserName}] Selecting a random product to add to cart`);

    const product = await this.dashboardPage.addRandomProductToCart();

    expect(product.name, "Product name should exist").toBeTruthy();
    expect(product.price, "Product price should be valid").toBeGreaterThan(0);
    await expect(product.button).toContainText("Remove");
});