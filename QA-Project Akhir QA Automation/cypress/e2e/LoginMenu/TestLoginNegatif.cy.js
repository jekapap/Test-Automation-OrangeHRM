import loginPage from "../../support/pageObjects/loginPage";
import loginData from "../../fixtures/loginData.json";

describe("Validasi Fungsi Login", () => {
  it("TC-login104-Login menggunakan username valid & Password invalid", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.invalidPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorInvalidCredential();
    loginPage.assertion.loginURL();
  });
  it("TC-login105-Login menggunakan username invalid & password valid", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorInvalidCredential();
    loginPage.assertion.loginURL();
  });

  it("TC-login106-Login tanpa mengisi username & password", () => {
    loginPage.visitPage();
    loginPage.klikLogin();
    loginPage.assertion.errorRequiredinUsername();
    loginPage.assertion.errorRequiredinPassword();
    loginPage.assertion.loginURL();
  });

  it("TC-login107-Login dengan mengisi username dan password dikosongkan", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.klikLogin();
    loginPage.assertion.errorRequiredinPassword();
    loginPage.assertion.usernameNoError();
    loginPage.assertion.loginURL();
  });

  it("TC-login108-Login dengan username dikosongkan dan password diisi", () => {
    loginPage.visitPage();
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorRequiredinUsername();
    loginPage.assertion.passwordNoError();
    loginPage.assertion.loginURL();
  });
  it("TC-login109-Tipe karakter teks Password kapital semua", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.kapitalPassword);
    loginPage.klikLogin();
    loginPage.assertion.errorInvalidCredential();
    loginPage.assertion.loginURL();
  });
});
