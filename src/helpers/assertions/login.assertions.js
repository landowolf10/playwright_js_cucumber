import { ASSERTION_NAMES, ERROR_MESSAGES } from "../../config/constants.js";
import { assertVisible, assertTextEquals } from "./general_assertions.js";

export async function assertLoginSuccess(loginPage) {
    await assertVisible(
        loginPage.page,
        loginPage.dashboardLocators.cartIcon,
        "Cart icon should be visible after login"
    );
}

export async function assertLoginFailed(loginPage) {
    const errorText = await loginPage.getErrorMessageText();

    await assertVisible(
        loginPage.page,
        loginPage.loginLocators.errorMessage,
        ASSERTION_NAMES.assertVisible
    );

    assertTextEquals(
        errorText,
        ERROR_MESSAGES.lockedLogin,
        ASSERTION_NAMES.assertTextMatch
    );
}

export async function assertLoginResult(loginPage, result) {
    if (result === "success") {
        await assertLoginSuccess(loginPage);
    } else {
        await assertLoginFailed(loginPage);
    }
}