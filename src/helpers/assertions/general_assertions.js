import { expect } from "@playwright/test";
import { TIMEOUTS } from "../../config/constants.js";

/**
 * Normalize locator (string or Locator)
 */
function resolveLocator(page, locator) {
  return typeof locator === "string"
    ? page.locator(locator)
    : locator;
}

/**
 * Assert that an element is visible on the page.
 *
 * @param {import('@playwright/test').Page} page - Playwright page instance
 * @param {string | import('@playwright/test').Locator} locator - Selector string or Playwright Locator
 * @param {string} name - Friendly name of the element for logging/error messages
 * @param {number} [timeout=TIMEOUTS.short] - Maximum time to wait for visibility
 * @returns {Promise<void>}
 */
export async function assertVisible(page, locator, message, timeout = TIMEOUTS.short) {
  const element = resolveLocator(page, locator);
  await expect(element, message).toBeVisible({ timeout });
}

/**
 * Assert element is hidden
 */
export async function assertHidden(page, locator, message, timeout = TIMEOUTS.short) {
  const element = resolveLocator(page, locator);
  await expect(element, message).toBeHidden({ timeout });
}

/**
 * Assert that two strings are equal.
 *
 * @param {string} actual - Actual value obtained
 * @param {string} expected - Expected value
 * @param {string} name - Friendly name for the assertion
 * @returns {void}
 */
export function assertTextEquals(actual, expected, message) {
  expect(actual, message).toEqual(expected);
}

/**
 * Assert that an element contains the expected text.
 *
 * @param {import('@playwright/test').Locator} element - Playwright locator for the element
 * @param {string | RegExp} expected - Expected text value or pattern
 * @param {string} name - Friendly name for the assertion
 * @returns {Promise<void>}
 */
export async function assertHasText(locator, expected, message) {
  await expect(locator, message).toContainText(expected);
}

export function assertGreaterThan(value, min, message) {
  expect(value, message).toBeGreaterThan(min);
}

/**
 * Assert truthy
 */
export function assertTruthy(value, message) {
  expect(value, message).toBeTruthy();
}