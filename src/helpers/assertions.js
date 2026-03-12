import { expect } from "@playwright/test";
import { TIMEOUTS } from "../config/constants.js";

/**
 * Assert that an element is visible on the page.
 *
 * @param {import('@playwright/test').Page} page - Playwright page instance
 * @param {string | import('@playwright/test').Locator} locator - Selector string or Playwright Locator
 * @param {string} name - Friendly name of the element for logging/error messages
 * @param {number} [timeout=TIMEOUTS.short] - Maximum time to wait for visibility
 * @returns {Promise<void>}
 */
export async function assertVisible(page, locator, name, timeout = TIMEOUTS.short) {
  const element =
    typeof locator === "string"
      ? page.locator(locator)
      : locator;

  await expect(element, `${name} should be visible`)
    .toBeVisible({ timeout });
}

/**
 * Assert that two strings are equal.
 *
 * @param {string} actual - Actual value obtained
 * @param {string} expected - Expected value
 * @param {string} name - Friendly name for the assertion
 * @returns {void}
 */
export async function assertEqualsTextString(actual, expected, name) {
  expect(actual, `${name} should equal text: ${expected}`)
    .toEqual(expected);
}

/**
 * Assert that an element contains the expected text.
 *
 * @param {import('@playwright/test').Locator} element - Playwright locator for the element
 * @param {string | RegExp} expected - Expected text value or pattern
 * @param {string} name - Friendly name for the assertion
 * @returns {Promise<void>}
 */
export async function assertHasText(element, expected, name) {
  await expect(element, `${name} should contain text: ${expected}`)
    .toHaveText(expected);
}