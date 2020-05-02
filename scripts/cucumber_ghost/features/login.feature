Feature: Login into ghost
    As an user I want to authenticate myself within ghost website

Scenario Outline: login User

    Given I go to ghost home screen
    When I open the login screen
    And I fill with <email> and <password>
    And I try to login
    Then I expect to see in login <error>

    Examples:
     | email                           |password| error                                  |
     |angela.anaya2309@gmail.com       |        | "Please fill out the form to sign in." |
     |                                 |12345678| "Please fill out the form to sign in." |
     |angela.anaya2309@gmail.com       |12345678| "Access denied."                       |
     |angela.anaya.castaneda@gmail.com |1234    | "Your password is incorrect."          |
     

Scenario Outline: Login successful
Given I go to ghost home screen
    When I open the login screen
    And I fill with <email> and <password>
    And I try to login
    Then I expect to see successful login

    Examples:
      | email                          | password |
	  |angela.anaya.castaneda@gmail.com|juanda2309|