import { LoginLocators } from "../locators/login_locators.js";
import { DashboardLocators } from "../locators/dashboard_locators.js";
import { BasePage } from "../helpers/BasePage.js";
import { ENV } from "../config/env.config.js";
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

  async login(user) {
    logger.info(`Logging in with user: ${user.username}`);

    await this.writeText(this.loginLocators.userTextbox, user.username);
    await this.writeText(this.loginLocators.passwordTextbox, user.password);
    await this.clickElement(this.loginLocators.loginButton);
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