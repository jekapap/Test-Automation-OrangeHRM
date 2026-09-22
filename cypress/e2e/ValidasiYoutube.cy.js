describe("Akses Social Media OrangeHRM", () => {
  it("TC-login401-Mengakses Youtube OrangeHRM pada bagian Footer", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]')
      .click()
      .should("be.visible")
      .and("have.attr", "href");

    cy.intercept("GET", "https://www.youtube.com/c/OrangeHRMInc").as(
      "validasiYoutube",
    );
  });
});
