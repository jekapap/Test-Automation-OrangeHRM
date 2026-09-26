import loginPage from "../../support/pageObjects/loginPage";
import loginData from "../../fixtures/loginData.json";

describe("Validasi Fungsi Login", () => {
  it("TC-login101-Login menggunakan data username & password valid", () => {
    loginPage.visitPage();
    loginPage.intercept.positiveLogin();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.intercept.waitPositiveLogin();
    loginPage.assertion.verifikasiURL();
  });
  it("TC-login102-Karakter Password  tersembunyi secara bawaan", () => {
    loginPage.visitPage();
    loginPage.passwordMasking(loginData.validPassword);
    loginPage.assertion.loginURL();
  });
  it('TC-login103-Mengakses halaman "Forgot your Password?"', () => {
    loginPage.visitPage();
    loginPage.assertion.klikForgotPss();
    loginPage.forgotPssURL();
    loginPage.assertion.uiForgotPss();
  });
});
