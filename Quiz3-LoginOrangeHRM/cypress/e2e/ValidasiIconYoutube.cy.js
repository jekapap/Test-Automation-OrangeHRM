describe("Akses Social Media OrangeHRM", () => {
  it("TC-login401-Mengakses Youtube OrangeHRM pada bagian Footer", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]')
      .click()
      .should("be.visible")
      .and("have.attr", "href")
      .and("include", "https://www.youtube.com/c/OrangeHRMInc");
    cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]').should(
      "have.attr",
      "target",
      "_blank"
    );
  });
});
