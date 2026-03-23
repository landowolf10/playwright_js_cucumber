import { When } from "@cucumber/cucumber";
import { logger } from "../../helpers/logger.js";

When("I add a product to the cart", async function () {
    logger.info(`[${this.browserName}] Adding product to cart`);

    const product = await this.dashboardPage.getRandomProduct();
    await this.dashboardPage.addProductToCart(product);

    this.selectedProduct = product;
});