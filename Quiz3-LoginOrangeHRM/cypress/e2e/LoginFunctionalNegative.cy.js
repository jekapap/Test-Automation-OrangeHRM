describe("Validasi Fungsi Login", () => {
  it("TC-login102-Login menggunakan username valid & Password invalid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("wrongPassword");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content.oxd-alert-content--error")
      .should("be.visible")
      .and("have.text", "Invalid credentials");
    cy.url().should("include", "/auth/login");
  });
  it("TC-login103-Login menggunakan username invalid & password valid", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[placeholder="Username"]').type("Jemyka");
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content.oxd-alert-content--error")
      .should("be.visible")
      .and("have.text", "Invalid credentials");
    cy.url().should("include", "/auth/login");
  });
  it("TC-login104-Login tanpa mengisi username & password", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[placeholder="Username"]');
    cy.get('input[placeholder="Password"]');
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-input-group__message")
      .should("be.visible")
      .and("have.text", "RequiredRequired");
    cy.url().should("include", "/auth/login");
  });
  it("TC-login105-Login dengan mengisi username dan password dikosongkan", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
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
  it("TC-login106-Login dengan username dikosongkan dan password diisi", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[placeholder="Username"]');
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.get('input[placeholder="Username"]')
      .parents(".oxd-input-group")
      .find(".oxd-input-group__message")
      .should("be.visible")
      .and("have.text", "Required");
    cy.get('input[placeholder="Password"]')
      .parents(".oxd-input-group")
      .find(".oxd-input-group__message")
      .should("not.exist");
    cy.url().should("include", "/auth/login");
  });
  it("TC-login107-Tipe karakter teks Password kapital semua", () => {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
    );
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("ADMIN123");
    cy.get('button[type="submit"]').click();
    cy.get(".oxd-alert-content.oxd-alert-content--error")
      .should("be.visible")
      .and("have.text", "Invalid credentials");
    cy.url().should("include", "/auth/login");
  });
});
