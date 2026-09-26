import rekrutmenPage from "../../support/pageObjects/rekrutmenPage";
import rekrutmenData from "../../fixtures/rekrutmenData.json";

describe("Pencarian Data Kandidat", () => {
  beforeEach(() => {
    rekrutmenPage.login();
    rekrutmenPage.visitRekrutmen();
  });
  it("TC005-Mencari Kandidat berdasarkan Job Title", () => {
    rekrutmenPage.visitRekrutmen();
    rekrutmenPage.intercept.jobTitle();
    rekrutmenPage.klikjobTitle();
    rekrutmenPage.inputJobTitle(rekrutmenData.JobTitle);
    rekrutmenPage.klikSearch();
    rekrutmenPage.assertion.tampilHasilPencarian();
  });
  it("TC006-Mencari Kandidat berdasarkan Vacancy", () => {
    rekrutmenPage.visitRekrutmen();
    rekrutmenPage.intercept.vacancy();
    rekrutmenPage.klikVacancy();
    rekrutmenPage.inputVacancy(rekrutmenData.Vacancy);
    rekrutmenPage.klikSearch();
    rekrutmenPage.assertion.tampilHasilPencarian();
  });
  it("TC007-Mencari nama kandidat dengan nama dan menampilkan data", () => {
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
  it("TC008-Menampilkan nama kandidat yang tidak valid", () => {
    rekrutmenPage.intercept.cariNamaKandidat();
    rekrutmenPage.inputKandidat(rekrutmenData.invalidSuggestName);
    rekrutmenPage.assertion.NoRecordsFound();
    rekrutmenPage.klikSearch();
    rekrutmenPage.assertion.Invalid();
  });
});
