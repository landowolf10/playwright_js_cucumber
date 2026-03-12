import { Given, When, Then } from "@cucumber/cucumber";
import { users } from "../../config/test-data.js";
import { logger } from "../../helpers/logger.js";

Given("I navigate to SauceLab", async function () {
    logger.info(`[${this.browserName}] Navigating to SauceLab application`);
    await this.loginPage.navigateToSauceLab();
});

When("I enter {string} credentials", async function (userType) {
    logger.info(`[${this.browserName}] Entering credentials for user type: ${userType}`);

    try {
        const user = users[userType];

        if (!user) {
            throw new Error(`User type "${userType}" not defined in test data`);
        }

        await this.loginPage.writeUsername(user.username);
        await this.loginPage.writePassword(user.password);
    } catch (error) {
        logger.error(`[${this.browserName}] Failed to enter credentials for "${userType}"`);

        throw new Error(
            `Failed to enter credentials for "${userType}". ${error.message}`
        );
    }
});

Then("I click the login button", async function () {
    logger.info(`[${this.browserName}] Clicking login button`);
    await this.loginPage.clickLoginButton();
});

Then("the login result should be {string}", async function (result) {
     logger.info(`[${this.browserName}] Validating login result: expected ${result}`);

    if (result === "success") {
        await this.loginPage.assertLoginSuccess();
    } else {
        await this.loginPage.assertLoginFailed();
    }
});