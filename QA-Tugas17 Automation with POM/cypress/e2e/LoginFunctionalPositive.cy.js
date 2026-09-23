import loginPage from "../support/pageObjects/loginPage";
import loginData from "../fixtures/loginData.json";

describe("Validasi Fungsi Login", () => {
  it("TC-login101-Login menggunakan data username & password valid", () => {
    loginPage.visitPage();
    loginPage.inputUsername(loginData.validUsername);
    loginPage.inputPassword(loginData.validPassword);
    loginPage.klikLogin();
    loginPage.verifikasiURL();
    // cy.visit(
    //   "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    // );
    // cy.get('input[placeholder="Username"]').type("Admin");
    // cy.get('input[placeholder="Password"]').type("admin123");
    // cy.get('button[type="submit"]').click();
    // cy.url().should("include", "/dashboard");
  });
});
