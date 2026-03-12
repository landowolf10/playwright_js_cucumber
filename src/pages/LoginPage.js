import { LoginLocators } from "../locators/login_locators.js";
import { DashboardLocators } from "../locators/dashboard_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { ENV } from "../config/env.config.js";
import { assertVisible } from "../helpers/assertions.js";
import { logger } from "../helpers/logger.js";

/**
 * Page Object representing the SauceLab Login page.
 * Provides actions and validations related to authentication.
 *
 * @extends BasePage
 */
export class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.loginLocators = new LoginLocators();
    this.dashboardLocators = new DashboardLocators();
  }

  /**
   * Navigates to the SauceLab application.
   * Validates that the loaded page contains the expected title.
   *
   * @returns {Promise<void>}
   * @throws {Error} If navigation fails or the page title is unexpected
   */
  async navigateToSauceLab() {
    try {
      await this.page.goto(ENV.baseURL);

      const title = await this.page.title();

      if (!title.toLowerCase().includes("swag")) {
        throw new Error(`Unexpected page title: ${title}`);
      }

    } catch (error) {
      throw new Error(
        `Navigation to SauceLab failed. URL: ${ENV.baseURL}. Error: ${error.message}`
      );
    }
  }

  /**
   * Performs login using provided credentials.
   *
   * @param {string} userName - Username used for login
   * @param {string} password - Password used for login
   * @returns {Promise<void>}
   */
  async login(userName, password) {
    logger.info(`Performing login with user: ${userName}`);

    try {
      await this.writeText(this.loginLocators.userTextbox, userName);
      await this.writeText(this.loginLocators.passwordTextbox, password);
      await this.clickElement(this.loginLocators.loginButton);

    } catch (error) {
      logger.error(`Login process failed for user ${userName}: ${error.message}`);
      throw error;
    }
  }

  /**
   * Writes the username into the username input field.
   *
   * @param {string} userName - Username value
   * @returns {Promise<void>}
   */
  async writeUsername(userName) {
    logger.info(`Entering username: ${userName}`);

    try {
      await this.writeText(this.loginLocators.userTextbox, userName);
      logger.info("Username entered successfully");

    } catch (error) {
      logger.error(`Failed to enter username: ${error.message}`);
      throw error;
    }
  }

  /**
   * Writes the password into the password input field.
   *
   * @param {string} password - Password value
   * @returns {Promise<void>}
   */
  async writePassword(password) {
    logger.info("Entering password");

    try {
      await this.writeText(this.loginLocators.passwordTextbox, password);
      logger.info("Password entered successfully");

    } catch (error) {
      logger.error(`Failed to enter password: ${error.message}`);
      throw error;
    }
  }

  /**
   * Clicks the login button.
   *
   * @returns {Promise<void>}
   */
  async clickLoginButton() {
    logger.info("Clicking login button");

    try {
      await this.clickElement(this.loginLocators.loginButton);
      logger.info("Login button clicked");

    } catch (error) {
      logger.error(`Failed to click login button: ${error.message}`);
      throw error;
    }
  }

  /**
   * Validates that login was successful by verifying the dashboard cart icon.
   *
   * @returns {Promise<void>}
   * @throws {Error} If the dashboard is not displayed
   */
  async assertLoginSuccess() {
    logger.info("Validating successful login");

    try {
      await assertVisible(this.page, this.dashboardLocators.cartIcon, "Cart Icon");
      logger.info("Login successful - dashboard loaded");
    } catch (error) {
      logger.error("Login success validation failed");
      throw new Error(
        `Login success verification failed. User was not redirected to the dashboard. ${error.message}`
      );

    }
  }

  /**
   * Validates that login failed and checks the expected error message.
   *
   * @returns {Promise<void>}
   * @throws {Error} If the error message is not the expected one
   */
  async assertLoginFailed() {
    logger.info("Validating login failure");

    const errorMessageText = await this.getErrorMessageText();

    await assertVisible(this.page, this.loginLocators.loginButton, "Login button");
    await assertVisible(this.page, this.loginLocators.errorMessage, "Error message");

    logger.info(`Error message displayed: ${errorMessageText}`);

    if (errorMessageText !== "Epic sadface: Sorry, this user has been locked out.") {
      throw new Error(
        `Unexpected error message.
      Expected: "Epic sadface: Sorry, this user has been locked out."
      Actual: "${errorMessageText}"`
      );
    }
  }

  /**
   * Retrieves the login error message text.
   *
   * @returns {Promise<string>} Error message text or default message if not found
   */
  async getErrorMessageText() {
    logger.info("Retrieving login error message text");
    const errorMessage = await this.getElementText(this.loginLocators.errorMessage);

    return errorMessage ?? "Error message not found.";
  }
}