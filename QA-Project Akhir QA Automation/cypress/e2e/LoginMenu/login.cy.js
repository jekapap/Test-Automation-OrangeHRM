import loginPage from "../../support/pageObjects/loginPage";
import loginData from "../../fixtures/loginData.json";

describe("Validasi Fungsi Login", () => {
  beforeEach(() => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  });
  it("TC-login101-Login menggunakan data username & password valid", () => {
    loginPage.intercept.positiveLogin();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.intercept.waitPositiveLogin();
    loginPage.assertion.verifikasiURL();
  });
  it("TC-login102-Karakter Password  tersembunyi secara bawaan", () => {
    loginPage.passwordMasking(loginData.validPassword);
    loginPage.assertion.loginURL();
  });
  it("TC-login103-Login menggunakan username valid & Password invalid", () => {
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.invalidPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorInvalidCredential();
    loginPage.assertion.loginURL();
  });
  it("TC-login104-Login menggunakan username invalid & password valid", () => {
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorInvalidCredential();
    loginPage.assertion.loginURL();
  });
  it("TC-login105-Login tanpa mengisi username & password", () => {
    loginPage.klikLogin();
    loginPage.assertion.errorRequiredinUsername();
    loginPage.assertion.errorRequiredinPassword();
    loginPage.assertion.loginURL();
  });
  it("TC-login106-Login dengan mengisi username dan password dikosongkan", () => {
    loginPage.inputUsername(loginData.validUsername);
    loginPage.klikLogin();
    loginPage.assertion.errorRequiredinPassword();
    loginPage.assertion.usernameNoError();
    loginPage.assertion.loginURL();
  });
  it("TC-login107-Login dengan username dikosongkan dan password diisi", () => {
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorRequiredinUsername();
    loginPage.assertion.passwordNoError();
    loginPage.assertion.loginURL();
  });
  it("TC-login108-Tipe karakter teks Password kapital semua", () => {
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.kapitalPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorInvalidCredential();
    loginPage.assertion.loginURL();
  });
  it('TC-login109-Mengakses halaman "Forgot your Password?"', () => {
    loginPage.assertion.klikForgotPss();
    loginPage.forgotPssURL();
    loginPage.assertion.uiForgotPss();
  });
  it("TC-login110-Mengakses Youtube OrangeHRM pada bagian Footer", () => {
    loginPage.assertion.klikYoutube();
    loginPage.assertion.getYoutube();
  });
});
