/// <reference types="cypress" />
import * as element from "@helpers/elements";
import * as route from "@helpers/route";
import { ROUTES } from "@tests/consts/routes";
import * as pageAuth from "@tests/pages/auth.page";
import * as assert from "@helpers/assert";
import * as dataAuth from "@tests/datas/auth.data";
beforeEach(() => {
  route.visit(ROUTES.myAccount);
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });
});
describe("Feature Auth", () => {
  it("Should successfully login with verif account", () => {
    element.fillFilled(pageAuth.inputUsername, dataAuth.VALID_ACCOUNT_VERIF.username);
    element.fillFilled(pageAuth.inputPassword, dataAuth.VALID_ACCOUNT_VERIF.password);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(pageAuth.titleAccount, dataAuth.VALID_ACCOUNT_VERIF.name);
  });
  it("Shouldn't successfully login with not verif account", () => {
    element.fillFilled(pageAuth.inputUsername, dataAuth.VALID_ACCOUNT_NOT_VERIF.username);
    element.fillFilled(pageAuth.inputPassword, dataAuth.VALID_ACCOUNT_NOT_VERIF.password);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(pageAuth.errorMessage, "Your account has to be activated before you can login");
  });
  it("Shouldn't successfully login with verif account and wrong password", () => {
    element.fillFilled(pageAuth.inputUsername, dataAuth.INVALID_ACCOUNT_VERIF.username);
    element.fillFilled(pageAuth.inputPassword, dataAuth.INVALID_ACCOUNT_VERIF.password);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(
      pageAuth.errorMessage,
      "Error: The password you entered for the email address " +
        dataAuth.INVALID_ACCOUNT_VERIF.username +
        " is incorrect."
    );
  });
  it("Shouldn't successfully login with not verif account and wrong password", () => {
    element.fillFilled(pageAuth.inputUsername, dataAuth.INVALID_ACCOUNT_NOT_VERIF.username);
    element.fillFilled(pageAuth.inputPassword, dataAuth.INVALID_ACCOUNT_NOT_VERIF.password);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(
      pageAuth.errorMessage,
      "Error: The password you entered for the email address " +
        dataAuth.INVALID_ACCOUNT_VERIF.username +
        " is incorrect."
    );
  });
  it("Shouldn't successfully login with verif account and password null", () => {
    element.fillFilled(pageAuth.inputUsername, dataAuth.VALID_ACCOUNT_VERIF.username);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(pageAuth.errorMessage, "Error: Password is required.");
  });
  it("Shouldn't successfully login with not verif account and password null", () => {
    element.fillFilled(pageAuth.inputUsername, dataAuth.INVALID_ACCOUNT_NOT_VERIF.username);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(pageAuth.errorMessage, "Error: Password is required.");
  });
  it("Shouldn't successfully login with username null", () => {
    element.fillFilled(pageAuth.inputPassword, dataAuth.VALID_ACCOUNT_VERIF.password);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(pageAuth.errorMessage, "Error: Username is required.");
  });
  it("Shouldn't successfully login with username and password null", () => {
    element.fillFilled(pageAuth.inputPassword, dataAuth.VALID_ACCOUNT_VERIF.password);
    element.click(pageAuth.buttonSubmitLogin);
    assert.shouldContainText(pageAuth.errorMessage, "Error: Username and password is required.");
  });
});
