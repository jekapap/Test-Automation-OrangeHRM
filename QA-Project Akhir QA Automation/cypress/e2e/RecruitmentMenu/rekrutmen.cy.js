import rekrutmenPage from "../../support/pageObjects/rekrutmenPage";
import rekrutmenData from "../../fixtures/rekrutmenData.json";
//
describe("Mengakses Menu Recruitmen", () => {
  beforeEach(() => {
    rekrutmenPage.login();
  });
  it("TC001-Mengakses halaman Recruitmen", () => {
    rekrutmenPage.intercept.kandidat();
    rekrutmenPage.visitRekrutmen();
    rekrutmenPage.assertion.rekrutmenURL();
  });
  it("TC002-Mengakses tab Vacancies", () => {
    rekrutmenPage.visitRekrutmen();
    rekrutmenPage.TabVacancies();
    rekrutmenPage.assertion.vacanciesURL();
  });
  it("TC003-Berhasil mengakses/klik button Add untuk menambahkan kandidat", () => {
    rekrutmenPage.visitRekrutmen();
    rekrutmenPage.klikAdd();
  });
  it("TC004-Klik Save pada Add Candidates tanpa mengisi field", () => {
    rekrutmenPage.visitRekrutmen();
    rekrutmenPage.klikAdd();
    rekrutmenPage.klikSave();
    rekrutmenPage.assertion.InvalidFirstName();
    rekrutmenPage.assertion.InvalidLastName();
    rekrutmenPage.assertion.InvalidEmail();
  });
});
