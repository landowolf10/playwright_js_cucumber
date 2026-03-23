import {
  assertVisible,
  assertTruthy
} from "../../helpers/assertions/general_assertions.js";

export async function assertCartHasItems(cartPage) {
  const items = await cartPage.getCartItems();

  assertTruthy(items.length > 0, "Cart should have at least one item");
}

export async function assertCartButtonsVisible(cartPage) {
  await assertVisible(
    cartPage.page,
    cartPage.cartLocators.removeButton,
    "Remove button should be visible"
  );

  await assertVisible(
    cartPage.page,
    cartPage.cartLocators.checkoutButton,
    "Checkout button should be visible"
  );

  await assertVisible(
    cartPage.page,
    cartPage.cartLocators.continueButton,
    "Continue shopping button should be visible"
  );
}

export async function assertCartIsEmpty(cartPage) {
  const count = await cartPage.getCartItemsCount();

  if (count !== 0) {
    throw new Error("Cart is not empty after removing product");
  }
}