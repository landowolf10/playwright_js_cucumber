Feature: Login functionality

  Scenario Outline: Login attempt
    Given I navigate to SauceLab
    When I enter "<userType>" credentials
    And I click the login button
    Then the login result should be "<result>"

    Examples:
      | userType  | result  |
      | standard  | success |
      | locked    | error   |
      | problem   | error   |