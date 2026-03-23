Feature: Login functionality

  Scenario Outline: User attempts to login
    Given I am logged in as "<userType>"
    Then I should see a "<result>" login outcome

    Examples:
      | userType  | result  |
      | standard  | success |
      | locked    | error   |
      | problem   | error   |