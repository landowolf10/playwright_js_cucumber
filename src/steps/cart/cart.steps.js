import { Then } from "@cucumber/cucumber";
import { logger } from "../../helpers/logger.js";

Then("finish cart validation", async function () {
    logger.info(`[${this.browserName}] Starting cart validation`);

    logger.info(`[${this.browserName}] Navigating to cart`);
    await this.dashboardPage.goToCart();

    logger.info(`[${this.browserName}] Verifying cart buttons are enabled`);
    await this.cartPage.assertButtonsAreEnabled();

    logger.info(`[${this.browserName}] Clicking remove button`);
    await this.cartPage.clickRemoveButton();

    logger.info(`[${this.browserName}] Verifying product elements were removed from cart`);
    await this.cartPage.verifyElementsRemoved();
});

