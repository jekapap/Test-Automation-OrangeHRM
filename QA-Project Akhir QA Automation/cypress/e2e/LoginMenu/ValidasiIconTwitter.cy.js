import loginPage from "../../support/pageObjects/loginPage";

describe("Akses Social Media OrangeHRM", () => {
  it("TC-login110-Mengakses Twitter OrangeHRM pada bagian Footer", () => {
    loginPage.visitPage();
    loginPage.assertion.klikTwitter();
    loginPage.assertion.getTwitter();
  });
});
