Feature: Cart management

  Background:
    Given I am logged in as "standard"

  Scenario: Add product to cart
    When I add a product to the cart
    Then the cart should contain 1 item

  Scenario: Remove product from cart
    Given I have a product in the cart
    When I remove the product from the cart
    Then the cart should be empty