import { Given, Then } from "@cucumber/cucumber";
import { users } from "../../config/test-data.js";
import { logger } from "../../helpers/logger.js";
import { assertLoginResult } from "../../helpers/assertions/login.assertions.js";

Given("I am logged in as {string}", async function (userType) {
    logger.info(`[${this.browserName}] Logging in as: ${userType}`);

    const user = users[userType];

    if (!user) {
        throw new Error(`User type "${userType}" not found`);
    }

    logger.info(`[${this.browserName}] Navigating to SauceLab application`);
    await this.loginPage.navigateToSauceLab();
    await this.loginPage.login(user);
});

Then("I should see a {string} login outcome", async function (result) {
    logger.info(`[${this.browserName}] Validating login outcome: ${result}`);

    await assertLoginResult(this.loginPage, result);
});