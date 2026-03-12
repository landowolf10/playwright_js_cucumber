export class CartLocators {
  constructor() {
    this.quantity = "[data-test='item-quantity']";
    this.itemDescription = "[data-test='inventory-item-desc']";
    this.removeButton = "button:has-text('Remove')";
    this.checkoutButton = "[data-test='checkout']";
    this.continueButton = "[data-test='continue-shopping']";
   
  }
}