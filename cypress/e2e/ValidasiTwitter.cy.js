describe("Akses Social Media OrangeHRM", () => {
  it("TC-login402-Mengakses Twitter OrangeHRM pada bagian Footer", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.intercept("GET", "https://x.com/orangehrm?lang=en").as(
      "validasiTwitter",
    );

    cy.get('a[href="https://twitter.com/orangehrm?lang=en"]')
      .click()
      .should("be.visible")
      .and("have.attr", "href");
  });
});
