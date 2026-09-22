describe("Validasi Fungsi Elemen", () => {
  it("TC-login201-Karakter Password  tersembunyi secara bawaan", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/dist/fonts/bootstrap-icons.woff2",
    ).as("karakterPassword");

    cy.get('input[placeholder="Password"]')
      .type("admin123")
      .should("be.visible")
      .and("have.attr", "type", "password");
  });
});
