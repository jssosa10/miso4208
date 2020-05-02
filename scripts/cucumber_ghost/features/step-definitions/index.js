var {Given} = require('cucumber');
var {When} = require('cucumber');
var {Then} = require('cucumber');
var {expect} = require('chai');

Given('I go to ghost home screen', () => {
  browser.url('http://localhost:2368/ghost/');
  /*if($('button=Cerrar').isDisplayed()) {
    $('button=Cerrar').click();
  }*/
  });

When('I open the login screen', () => {
  browser.url('http://localhost:2368/ghost/#/signin');
  /*$('button=Ingresar').waitForExist(5000);
  $('button=Ingresar').waitForDisplayed(5000);
  $('button=Ingresar').click();*/
});
  
  When(/^I fill with (.*) and (.*)$/ , (email, password) => {
    
    $('.gh-signin').waitForExist(5000);
    var cajaSignUp = $('.gh-signin');
  
    var nombreInput = cajaSignUp.$('input[name="identification"]');
    nombreInput.click();
    nombreInput.keys(email);
    
     var apellidoInput = cajaSignUp.$('input[name="password"]');
     apellidoInput.click();
     apellidoInput.keys(password);

    });

    When('I try to login', () => {
      var cajaSignUp = $('.gh-signin');
      cajaSignUp.$('button=Sign in').click();
    });

    Then('I expect to see in login {string}', error => {
      $('.main-error').waitForDisplayed(5000);
      var alertText = browser.$('.main-error').getText();
      expect(alertText).to.include(error);  
     });

    Then('I expect to see successful login', () => {
      //$('.btn-group').waitForExist(5000);
      $('.gh-user-avatar').waitForExist(5000);
     });