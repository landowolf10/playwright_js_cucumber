export class LoginLocators {
  constructor() {
    // Fixed locators
    this.userTextbox = "#user-name";
    this.passwordTextbox = "#password";
    this.loginButton = "#login-button";
    this.errorMessage = "[data-test='error']";
  }

  // Dynamic locator example
  locatorErrorMessageByText(text) {
    return `//*[contains(text(),'${text}')]`;
  }
}