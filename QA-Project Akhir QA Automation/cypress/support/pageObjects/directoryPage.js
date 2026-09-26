class directoryPage {
  //Action
  elements = {
    employeeName: () => cy.get('input[placeholder="Type for hints..."]'),
    getEmployeeName: (nama) =>
      cy
        .get(".oxd-autocomplete-dropdown", { timeout: 10000 })
        .should("be.visible")
        .contains(nama, { matchCase: false, timeout: 10000 }),
    getJobTitle: (jobtitle) => cy.get('[role="listbox"]').contains(jobtitle),
    getLocation: (location) => cy.get('[role="listbox"]').contains(location),
    getCardDetail: () =>
      cy
        .get(
          ".oxd-sheet.oxd-sheet--rounded.oxd-sheet--white.orangehrm-directory-card",
        )
        .first()
        .click(),
  };

  login() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.get('button[type="submit"]').click();
  }
  loginLanjutdirectory() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
    );
    cy.get('input[placeholder="Username"]').type("Admin");
    cy.get('input[placeholder="Password"]').type("admin123");
    cy.get('button[type="submit"]').click();
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory",
    );
  }
  visitDirectory() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory",
    );
  }
  inputEmployeeName(nama) {
    this.elements.employeeName().clear().type(nama);
  }
  selectEmployeeName(nama) {
    cy.get(".oxd-autocomplete-dropdown", { timeout: 10000 }).should(
      "be.visible",
    );
    this.elements.getEmployeeName(nama).click();
  }
  inputJobTitle(jobtitle) {
    this.elements.getJobTitle(jobtitle).click();
  }
  klikjobTitle() {
    cy.xpath("(//div)[43]").click();
  }
  klikLocation() {
    cy.xpath(
      "(//div[@class='oxd-select-text oxd-select-text--active'])[2]",
    ).click();
  }
  inputLocation(location) {
    this.elements.getLocation(location).click();
  }
  allFieldKosong() {
    cy.get('input[placeholder="Type for hints..."]').should("have.value", "");
    cy.get(".oxd-select-text").eq(0).should("contain", "-- Select --");
    cy.get(".oxd-select-text").eq(1).should("contain", "-- Select --");
  }
  klikSearch() {
    cy.get("button[type='submit']").click();
  }
  klikReset() {
    cy.contains("button", "Reset").click();
  }
  klikCardDetail() {
    this.elements.getCardDetail();
  }

  //Assertion
  assertion = {
    PageDirectory() {
      //menampilkan halaman awal menu directory
      cy.url().should("include", "/directory");
    },
    TampilanHasil() {
      //menampilkan hasil pencarian
      cy.xpath("//span[@class='oxd-text oxd-text--span'][1]").should(
        "be.visible",
      );
      cy.xpath("(//div[@class='orangehrm-container'])[1]").should("be.visible");
    },
    tampilanKaryawan(nama) {
      cy.contains(nama).should("be.visible");
    },
    tampilanNoRecord() {
      cy.contains("No Records Found", { timeout: 10000 }).should("exist");
    },
    Invalid() {
      cy.get(
        ".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message",
      ).should("be.visible");
    },
    verifProfileDetail() {
      cy.get(".orangehrm-corporate-directory-sidebar").should("be.visible");
    },
  };

  //Intercept
  intercept = {
    interceptDirectory() {
      cy.intercept("GET", "**/api/v2/directory/employees*").as("getDirectory");
    },
    waitDirectory() {
      cy.wait("@getDirectory").its("response.statusCode").should("eq", 200);
    },
    interceptCariNamaEmployee() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=peter",
      ).as("employeeName");
    },
    waitEmployeeName() {
      cy.wait("@employeeName").its("response.statusCode").should("eq", 200);
    },
    CariNamaEmployeeInvalid() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?nameOrId=jem",
      ).as("NamaEmployeeInvalid");
    },
    getJobTitle() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?jobTitleId=9",
      ).as("getJobTitle");
    },
    getLocation() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&locationId=5",
      ).as("getLocation");
    },
    getAllRecords() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0",
      ).as("AllRecords");
    },
    getCardDetail() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/directory/employees?limit=14&offset=0&empNumber=3",
      ).as("cardDetail");
    },
    waitCardDetail() {
      cy.wait("@cardDetail").its("response.statusCode").should("eq", 200);
    },
  };
}
export default new directoryPage();
