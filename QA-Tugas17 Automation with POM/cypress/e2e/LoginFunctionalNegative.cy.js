import loginPage from "../support/pageObjects/loginPage";
import loginData from "../fixtures/loginData.json";

describe("Validasi Fungsi Login", () => {
  it("TC-login102-Login menggunakan username valid & Password invalid", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.invalidPassword);
    loginPage.klikLogin();
    loginPage.errorInvalidCredential();
    loginPage.loginURL();
    // cy.visit(
    // "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    // );
    // cy.get('input[placeholder="Username"]').type("Admin");
    // cy.get('input[placeholder="Password"]').type("wrongPassword");
    // cy.get('button[type="submit"]').click();
    // cy.get(".oxd-alert-content.oxd-alert-content--error")
    // .should("be.visible")
    // .and("have.text", "Invalid credentials");
    // cy.url().should("include", "/auth/login");
  });
  it("TC-login103-Login menggunakan username invalid & password valid", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.invalidUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.errorInvalidCredential();
    loginPage.loginURL();
    // cy.visit(
    // "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    // );
    // cy.get('input[placeholder="Username"]').type("Jemyka");
    // cy.get('input[placeholder="Password"]').type("admin123");
    // cy.get('button[type="submit"]').click();
    // cy.get(".oxd-alert-content.oxd-alert-content--error")
    // .should("be.visible")
    // .and("have.text", "Invalid credentials");
    // cy.url().should("include", "/auth/login");
  });

  it("TC-login104-Login tanpa mengisi username & password", () => {
    loginPage.visitPage();
    loginPage.klikLogin();
    loginPage.errorRequired();
    loginPage.loginURL();
  });

  it("TC-login105-Login dengan mengisi username dan password dikosongkan", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.klikLogin();
    loginPage.errorRequiredinPassword();
    loginPage.usernameNoError();
    loginPage.loginURL();
  });

  it("TC-login106-Login dengan username dikosongkan dan password diisi", () => {
    loginPage.visitPage();
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.errorRequiredinUsername();
    loginPage.passwordNoError();
    loginPage.loginURL();
    // cy.visit(
    // "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    // );
    // cy.get('input[placeholder="Username"]');
    // cy.get('input[placeholder="Password"]').type("admin123");
    // cy.get('button[type="submit"]').click();
    // cy.get('input[placeholder="Username"]')
    // .parents(".oxd-input-group")
    // .find(".oxd-input-group__message")
    // .should("be.visible")
    // .and("have.text", "Required");
    // cy.get('input[placeholder="Password"]')
    // .parents(".oxd-input-group")
    // .find(".oxd-input-group__message")
    // .should("not.exist");
    // cy.url().should("include", "/auth/login");
    // });
  });
  it("TC-login107-Tipe karakter teks Password kapital semua", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.kapitalPassword);
    loginPage.klikLogin();
    loginPage.errorInvalidCredential();
    loginPage.loginURL();
    // cy.visit(
    // "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    // );
    // cy.get('input[placeholder="Username"]').type("Admin");
    // cy.get('input[placeholder="Password"]').type("ADMIN123");
    // cy.get('button[type="submit"]').click();
    // cy.get(".oxd-alert-content.oxd-alert-content--error")
    // .should("be.visible")
    // .and("have.text", "Invalid credentials");
    // cy.url().should("include", "/auth/login");
  });
});
