import rekrutmenData from "../../fixtures/rekrutmenData.json";

class rekrutmenPage {
  //Action
  elements = {
    kandidatName: (nama) => cy.get('input[placeholder="Type for hints..."]'),
    getKandidat: (nama) =>
      cy.get(".oxd-autocomplete-dropdown", { timeout: 10000 }).contains(nama),
    getJobTitle: (jobtitle) => cy.get('[role="listbox"]').contains(jobtitle),
    getVacancy: (vacancy) => cy.get('[role="listbox"]').contains(vacancy),
  };

  login() {
    cy.session("login", () => {
      cy.visit(
        "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login",
      );
      cy.get('input[placeholder="Username"]').type("Admin");
      cy.get('input[placeholder="Password"]').type("admin123");
      cy.get('button[type="submit"]').click();
    });
  }

  visitRekrutmen() {
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates",
    );
  }
  klikAdd() {
    cy.xpath("(//button[normalize-space()='Add'])[1]").click();
  }
  //jobtitle
  klikjobTitle() {
    cy.xpath("(//div)[35]").click();
  }
  inputJobTitle(jobtitle) {
    this.elements.getJobTitle(jobtitle).click();
  }
  //vacancy
  TabVacancies() {
    cy.get("li[class='oxd-topbar-body-nav-tab']").click().should("be.visible");
  }
  klikVacancy() {
    cy.xpath("(//div)[43]").click();
  }
  inputVacancy(vacancy) {
    this.elements.getVacancy(vacancy).click();
  }
  //Candidate Name
  inputKandidat(nama) {
    this.elements.kandidatName().clear().type(nama);
  }
  selectKandidat(nama) {
    cy.get(".oxd-autocomplete-dropdown", { timeout: 10000 }).should(
      "be.visible",
    );
    this.elements.getKandidat(nama).click();
  }
  klikSearch() {
    cy.xpath("(//button[normalize-space()='Search'])[1]").click();
  }
  klikReset() {
    cy.xpath("//button[normalize-space()='Reset']").click();
  }
  klikIconEye() {
    cy.xpath("(//button[@type='button'])[6]").click();
  }
  klikSave() {
    cy.get("button[type='submit']").click();
  }
  klikCancel() {
    cy.xpath("//button[normalize-space()='Cancel']").click();
  }

  //Assertion
  assertion = {
    rekrutmenURL() {
      cy.url().should("include", "/recruitment");
    },
    vacanciesURL() {
      cy.url().should("include", "/recruitment/viewJobVacancy");
    },
    addKandidatURL() {
      cy.url().should("include", "/recruitment/addCandidate");
    },
    tampilHasilPencarian() {
      cy.xpath("(//span[@class='oxd-text oxd-text--span'])[1]").should(
        "be.visible",
      );
      cy.xpath("(//div[@class='orangehrm-container'])[1]").should("be.visible");
    },
    tampilDataKandidat() {
      cy.url().should("include", "/recruitment/addCandidate/");
    },
    NoRecordsFound() {
      cy.contains("No Records Found", { timeout: 10000 }).should("exist");
    },
    Invalid() {
      cy.get(
        ".oxd-text.oxd-text--span.oxd-input-field-error-message.oxd-input-group__message",
      ).should("be.visible");
    },
    InvalidFirstName() {
      cy.get("input[placeholder='First Name']")
        .parent()
        .parent()
        .parent()
        .parent()
        .contains("Required")
        .should("be.visible");
    },
    InvalidLastName() {
      cy.get("input[placeholder='Last Name']")
        .parent()
        .parent()
        .parent()
        .parent()
        .contains("Required")
        .should("be.visible");
    },
    InvalidEmail() {
      cy.xpath("(//input[@placeholder='Type here'])[1]")
        .parent()
        .parent()
        .parent()
        .parent()
        .contains("Required")
        .should("be.visible");
    },
  };

  //Intercept
  intercept = {
    kandidat() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
      ).as("getKandidat");
    },
    waitKandidat() {
      cy.wait("@getKandidat").its("response.statusCode").should("eq", 200);
    },
    jobTitle() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/admin/job-titles?limit=0",
      ).as("jobTitle");
    },
    waitJobTitle() {
      cy.wait("@jobTitle").its("response.statusCode").should("eq", 200);
    },
    vacancy() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies?limit=50&offset=0&sortField=vacancy.name&sortOrder=ASC&model=detailed",
      ).as("vacancy");
    },
    waitVacancy() {
      cy.wait("@vacancy").its("response.statusCode").should("eq", 200);
    },
    TabAddKandidat() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/vacancies?model=summary&limit=0&status=true&excludeInterviewers=true",
      ).as("TabAddKandidat");
    },
    waitTabAddKandidat() {
      cy.wait("@TabAddKandidat").its("response.statusCode").should("eq", 200);
    },
    namaKandidat() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?limit=50&offset=0&candidateId=19&model=list&sortField=candidate.dateOfApplication&sortOrder=DESC",
      ).as("namaKandidat");
    },
    waitKandidat() {
      cy.wait("@namaKandidat").its("response.statusCode").should("eq", 200);
    },
    viewDataKandidat() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates/19/actions/allowed",
      ).as("viewDataKandidat");
    },
    waitDataKandidat() {
      cy.wait("@viewDataKandidat").its("response.statusCode").should("eq", 200);
    },
    cariNamaKandidat() {
      cy.intercept(
        "GET",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates?candidateName=anc",
      ).as("cariNamaKandidat");
    },
    waitCariNamaKandidat() {
      cy.wait("@cariNamaKandidat").its("response.statusCode").should("eq", 200);
    },
    saveKandidat() {
      cy.intercept(
        "POST",
        "https://opensource-demo.orangehrmlive.com/web/index.php/api/v2/recruitment/candidates",
      ).as("savekandidat");
    },
    waitSaveKandidat() {
      cy.wait("@savekandidat").its("response.statusCode").should("eq", 200);
    },
  };
}

export default new rekrutmenPage();
