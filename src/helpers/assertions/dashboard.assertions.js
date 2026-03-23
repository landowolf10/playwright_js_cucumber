import {
  assertGreaterThan,
  assertTruthy,
  assertHasText
} from "../../helpers/assertions/general_assertions.js";

export function assertProductsValid(products) {
  assertGreaterThan(products.length, 0, "No products found");

  for (const product of products) {
    assertTruthy(product.name, `Product name missing: ${JSON.stringify(product)}`);
    assertGreaterThan(product.price, 0, `Invalid price for ${product.name}`);
  }
}

export async function assertProductAdded(product, dashboardPage) {
  assertTruthy(product.name, "Product name should exist");
  assertGreaterThan(product.price, 0, "Product price should be valid");

  const button = product.item.locator(
    dashboardPage.dashboardLocators.addToCartButton
  );

  await assertHasText(
    button,
    "Remove",
    "Button should change to Remove"
  );
}