class loginPage {
  elements = {
    usernameGet: () => cy.get('input[placeholder="Username"]'),
    passwordGet: (password) => cy.get("input[placeholder='Password']"),
  };
  visitPage() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
  }
  inputUsername(username) {
    this.elements.usernameGet().clear().type(username);
  }
  inputPassword(password) {
    this.elements.passwordGet().clear().type(password);
  }
  klikLogin() {
    cy.get('button[type="submit"]').click();
  }
  login(username, password) {
    this.inputUsername(username);
    this.inputPasswordPassword(password);
    this.klikLogin();
  }
  forgotPssURL() {
    cy.url(
      "include",
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode",
    );
  }
  klikCancelForgotPss() {
    cy.get("button[type='button']").click();
  }
  passwordMasking(password) {
    this.elements
      .passwordGet()
      .type(password)
      .should("be.visible")
      .and("have.attr", "type", "password");
  }

  //assertion
  assertion = {
    verifikasiURL() {
      cy.url().should("include", "/dashboard");
    },
    loginURL() {
      cy.url().should("include", "/auth/login");
    },
    errorRequiredinPassword() {
      cy.get('input[placeholder="Password"]')
        .parents(".oxd-input-group")
        .find(".oxd-input-group__message")
        .should("be.visible")
        .and("have.text", "Required");
    },
    errorRequiredinUsername() {
      cy.get('input[placeholder="Username"]')
        .parents(".oxd-input-group")
        .find(".oxd-input-group__message")
        .should("be.visible")
        .and("have.text", "Required");
    },
    errorInvalidCredential() {
      cy.get(".oxd-alert-content.oxd-alert-content--error")
        .should("be.visible")
        .and("have.text", "Invalid credentials");
    },
    usernameNoError() {
      cy.get('input[placeholder="Username"]')
        .parents(".oxd-input-group")
        .find(".oxd-input-group__message")
        .should("not.exist");
    },
    passwordNoError() {
      cy.get('input[placeholder="Password"]')
        .parents(".oxd-input-group")
        .find(".oxd-input-group__message")
        .should("not.exist");
    },
    klikForgotPss() {
      cy.get(".oxd-text.oxd-text--p.orangehrm-login-forgot-header")
        .should("be.visible")
        .and("contain.text", "Forgot your password?")
        .click();
    },
    uiForgotPss() {
      cy.get(".oxd-text.oxd-text--h6.orangehrm-forgot-password-title")
        .should("be.visible")
        .and("have.text", "Reset Password");
    },
    InputUsernameForgotPss() {
      this.elements.usernameGet().should("be.visible");
    },
    klikTwitter() {
      cy.get('a[href="https://twitter.com/orangehrm?lang=en"]')
        .click()
        .should("be.visible")
        .and("have.attr", "href")
        .and("include", "https://twitter.com/orangehrm?lang=en");
    },
    getTwitter() {
      cy.get('a[href="https://twitter.com/orangehrm?lang=en"]').should(
        "have.attr",
        "target",
        "_blank",
      );
    },
    klikYoutube() {
      cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]')
        .click()
        .should("be.visible")
        .and("have.attr", "href")
        .and("include", "https://www.youtube.com/c/OrangeHRMInc");
    },
    getYoutube() {
      cy.get('a[href="https://www.youtube.com/c/OrangeHRMInc"]').should(
        "have.attr",
        "target",
        "_blank",
      );
    },
  };

  intercept = {
    positiveLogin() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/dashboard/employees/action-summary",
      ).as("actionSummary");
    },
    waitPositiveLogin() {
      cy.wait("@actionSummary").its("response.statusCode").should("eq", 200);
    },
  };
}

export default new loginPage();
