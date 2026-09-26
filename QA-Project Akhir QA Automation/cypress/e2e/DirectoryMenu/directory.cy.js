import directoryPage from "../../support/pageObjects/directoryPage";
import directoryData from "../../fixtures/directoryData.json";

describe("Fitur Pencarian Data Karyawan", () => {
  beforeEach(() => {
    directoryPage.login();
  });
  it("TC101-Mengakses dan Menampilkan Menu Directory", () => {
    directoryPage.intercept.interceptDirectory();
    directoryPage.visitDirectory();
    directoryPage.assertion.PageDirectory();
    // directoryPage.typeNameEmployee();
  });
  it("TC102-Mencari data karyawan dengan nama valid", () => {
    directoryPage.intercept.interceptCariNamaEmployee();
    directoryPage.visitDirectory();
    directoryPage.inputEmployeeName(directoryData.suggestionName);
    directoryPage.selectEmployeeName(directoryData.validEmployee);
    directoryPage.klikSearch();
    directoryPage.assertion.TampilanHasil();
    // directoryPage.intercept.waitEmployeeName();
  });
  it("TC103-Mencari data karyawan berdasarkan nama yang tidak tersedia", () => {
    // directoryPage.login();
    directoryPage.intercept.CariNamaEmployeeInvalid();
    directoryPage.visitDirectory();
    directoryPage.inputEmployeeName(directoryData.invalidSuggestName);
    directoryPage.assertion.tampilanNoRecord();
    directoryPage.klikSearch();
    directoryPage.assertion.Invalid();
  });
  it("TC104-Mencari karyawan berdasarkan Job Title", () => {
    directoryPage.visitDirectory();
    directoryPage.intercept.getJobTitle();
    directoryPage.klikjobTitle();
    directoryPage.inputJobTitle(directoryData.validJobTitle);
    directoryPage.klikSearch();
    directoryPage.assertion.TampilanHasil();
    //menemukan bug, hasil yang dicari muncul namun data lain yang tidak sesuai ikut muncul, jadi jumlah records dengan card data yan muncul tidak sesuai
    //sudah saya coba betulkan cukup lama, nemun belum menemukan solusi
  });
  it("TC105-Mencari karyawan berdasarkan Lokasi", () => {
    directoryPage.visitDirectory();
    directoryPage.intercept.getLocation();
    directoryPage.klikLocation();
    directoryPage.inputLocation(directoryData.validLocation);
    directoryPage.klikSearch();
    directoryPage.assertion.TampilanHasil();
    //menemukan bug, hasil yang dicari muncul namun data lain yang tidak sesuai ikut muncul, jadi jumlah records dengan card data yan muncul tidak sesuai
    //sudah saya coba betulkan cukup lama, nemun belum menemukan solusi
  });
  it("TC106-Klik Search tanpa memasukan data filter", () => {
    directoryPage.visitDirectory();
    directoryPage.intercept.getAllRecords();
    directoryPage.klikSearch();
    directoryPage.assertion.TampilanHasil();
    directoryPage.assertion.PageDirectory();
  });
  it("TC107-Klik Reset setelah mencari berdasarkan nama & lokasi", () => {
    directoryPage.intercept.getLocation();
    directoryPage.intercept.interceptCariNamaEmployee();
    directoryPage.visitDirectory();
    directoryPage.inputEmployeeName(directoryData.suggestionName);
    directoryPage.selectEmployeeName(directoryData.validEmployee);
    directoryPage.klikLocation();
    directoryPage.inputLocation(directoryData.locationPeter);
    directoryPage.klikSearch();
    directoryPage.assertion.TampilanHasil();
    directoryPage.klikReset();
    directoryPage.allFieldKosong();
  });
  it("TC108-Klik card karyawan untuk melihat detail", () => {
    directoryPage.intercept.interceptCariNamaEmployee();
    directoryPage.visitDirectory();
    directoryPage.inputEmployeeName(directoryData.suggestionName);
    directoryPage.selectEmployeeName(directoryData.validEmployee);
    directoryPage.intercept.getCardDetail();
    directoryPage.klikSearch();
    directoryPage.assertion.TampilanHasil();
    directoryPage.klikCardDetail();
    directoryPage.assertion.verifProfileDetail();
    directoryPage.intercept.waitCardDetail();
  });
});
