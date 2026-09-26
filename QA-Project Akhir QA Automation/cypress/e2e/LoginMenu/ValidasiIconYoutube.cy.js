import loginPage from "../../support/pageObjects/loginPage";

describe("Akses Social Media OrangeHRM", () => {
  it("TC-login111-Mengakses Youtube OrangeHRM pada bagian Footer", () => {
    loginPage.visitPage();
    loginPage.assertion.klikYoutube();
    loginPage.assertion.getYoutube();
  });
});
