import rekrutmenPage from "../../support/pageObjects/rekrutmenPage";
import rekrutmenData from "../../fixtures/rekrutmenData.json";

describe("Mengakses Menu Recruitmen", () => {
  beforeEach(() => {
    rekrutmenPage.login();
    cy.visit(
      "https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates",
    );
  });
  it.only("TC001-Mengakses halaman Recruitmen", () => {
    rekrutmenPage.intercept.kandidat();
    // rekrutmenPage.visitRekrutmen();
    rekrutmenPage.assertion.rekrutmenURL();
  });
  it("TC002-Mengakses tab Vacancies", () => {
    // rekrutmenPage.visitRekrutmen();
    rekrutmenPage.intercept.vacancy();
    rekrutmenPage.TabVacancies();
    rekrutmenPage.intercept.waitVacancy();
    rekrutmenPage.assertion.vacanciesURL();
  });
  it("TC003-Mencari Kandidat berdasarkan Job Title", () => {
    // rekrutmenPage.visitRekrutmen();
    rekrutmenPage.intercept.jobTitle();
    rekrutmenPage.klikjobTitle();
    rekrutmenPage.inputJobTitle(rekrutmenData.JobTitle);
    rekrutmenPage.klikSearch();
    rekrutmenPage.assertion.tampilHasilPencarian();
  });
  it("TC004-Mencari Kandidat berdasarkan Vacancy", () => {
    // rekrutmenPage.visitRekrutmen();
    rekrutmenPage.intercept.vacancy();
    rekrutmenPage.klikVacancy();
    rekrutmenPage.inputVacancy(rekrutmenData.Vacancy);
    rekrutmenPage.klikSearch();
    rekrutmenPage.assertion.tampilHasilPencarian();
  });
  it("TC005-Mencari nama kandidat dengan nama dan menampilkan data", () => {
    rekrutmenPage.intercept.namaKandidat();
    rekrutmenPage.inputKandidat(rekrutmenData.suggestionName);
    rekrutmenPage.selectKandidat(rekrutmenData.validCandidates);
    rekrutmenPage.klikSearch();
    rekrutmenPage.intercept.waitKandidat();
    rekrutmenPage.assertion.tampilHasilPencarian();
    rekrutmenPage.intercept.viewDataKandidat();
    rekrutmenPage.klikIconEye();
    rekrutmenPage.intercept.waitDataKandidat();
    rekrutmenPage.assertion.tampilDataKandidat();
  });
  it("TC006-Menampilkan nama kandidat yang tidak valid", () => {
    rekrutmenPage.intercept.cariNamaKandidat();
    rekrutmenPage.inputKandidat(rekrutmenData.invalidSuggestName); // Error yang Anda alami terjadi di sini sebelumnya
    rekrutmenPage.assertion.NoRecordsFound();
    rekrutmenPage.klikSearch();
    rekrutmenPage.assertion.Invalid();
  });
  it("TC007-Berhasil mengakses/klik button Add untuk menambahkan kandidat", () => {
    // rekrutmenPage.visitRekrutmen();
    rekrutmenPage.intercept.TabAddKandidat();
    rekrutmenPage.klikAdd();
    rekrutmenPage.intercept.waitTabAddKandidat();
  });
  it("TC008-Klik Save pada Add Candidates tanpa mengisi field", () => {
    // rekrutmenPage.visitRekrutmen();
    rekrutmenPage.klikAdd();
    rekrutmenPage.klikSave();
    rekrutmenPage.assertion.InvalidFirstName();
    rekrutmenPage.assertion.InvalidLastName();
    rekrutmenPage.assertion.InvalidEmail();
  });
});
