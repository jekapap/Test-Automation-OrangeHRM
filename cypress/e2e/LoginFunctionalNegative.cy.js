describe("Validasi Fungsi Login", () => {
  it("TC-login102-Login menggunakan username valid & Password invalid", () => {
    cy.intercept(
      "POST",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/validate",
    ).as("wrongPassword");

    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("wrongPassword");

    cy.get('button[type="submit"]').click();

    cy.wait("@wrongPassword", { requestTimeout: 1000 });

    cy.get(".oxd-alert-content.oxd-alert-content--error")
      .should("be.visible")
      .and("have.text", "Invalid credentials");

    cy.url().should("include", "/auth/login");
  });

  it("TC-login105-Login dengan mengisi username dan password dikosongkan", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );

    cy.intercept(
      "GET",
      "https://opensource-demo.orangehrmlive.com/web/images/ohrm_branding.png?v=1783336755185",
    ).as("assetbrandingLogin");

    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]');

    cy.get('button[type="submit"]').click();

    cy.get('input[placeholder="Password"]')
      .parents(".oxd-input-group")
      .find(".oxd-input-group__message")
      .should("be.visible")
      .and("have.text", "Required");
    cy.get('input[placeholder="Username"]')
      .parents(".oxd-input-group")
      .find(".oxd-input-group__message")
      .should("not.exist");

    cy.url().should("include", "/auth/login");
  });
});
