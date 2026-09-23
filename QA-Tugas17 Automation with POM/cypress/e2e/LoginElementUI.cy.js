import loginPage from "../support/pageObjects/loginPage";
import loginData from "../fixtures/loginData.json";

describe("Validasi Fungsi Elemen", () => {
  it("TC-login201-Karakter Password  tersembunyi secara bawaan", () => {
    loginPage.visitPage();
    loginPage.passwordMasking(loginData.validPassword);
    loginPage.loginURL();

    // cy.visit(
    // "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    // );
    // cy.get('input[placeholder="Password"]')
    // .type("admin123")
    // .should("be.visible")
    // .and("have.attr", "type", "password");
  });
});
