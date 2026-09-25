describe("Validasi Fungsi Elemen", () => {
  it("TC-login201-Karakter Password  tersembunyi secara bawaan", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[placeholder="Password"]')
      .type("admin123")
      .should("be.visible")
      .and("have.attr", "type", "password");
  });
});
