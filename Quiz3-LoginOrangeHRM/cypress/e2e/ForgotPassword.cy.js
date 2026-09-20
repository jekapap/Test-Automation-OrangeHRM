describe("Verifikasi fitur lupa password", () => {
  it('TC-login301-Mengakses halaman "Forgot your Password?"', () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get(".oxd-text.oxd-text--p.orangehrm-login-forgot-header")
      .should("be.visible")
      .and("contain.text", "Forgot your password?")
      .click();
    cy.url(
      "include",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode"
    );
    cy.get(".oxd-text.oxd-text--h6.orangehrm-forgot-password-title")
      .should("be.visible")
      .and("have.text", "Reset Password");
    cy.get('input[placeholder="Username"]').should("be.visible");
  });
  it("TC-login302-Klik tombol Cancel pada halaman Reset Password", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode"
    );
    cy.get('button[type="button"]').click();
    cy.url("include", "/auth/login");
  });
});
