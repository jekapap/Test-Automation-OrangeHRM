describe("API Testing", () => {
  const baseUrl = "https://api.escuelajs.co/api/v1/categories";
  let createdCategoryId;
  it("TC001-Get All Categories", () => {
    cy.request("GET", "https://api.escuelajs.co/api/v1/categories").then(
      (response) => {
        expect(response.status).to.eq(200);
      },
    );
  });
  it("TC002-Get Categories by Limit with 2 Id", () => {
    cy.request({
      method: "GET",
      url: "https://api.escuelajs.co/api/v1/categories?limit=2",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.length(2);
    });
  });
  it("TC003-Get Categories with Valid Id", () => {
    cy.request({
      method: "GET",
      url: "https://api.escuelajs.co/api/v1/categories/5",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.not.be.null;
      expect(response.body.name).to.eq("Miscellaneous");
    });
  });
  it("TC004-Get Categories with Invalid Id", () => {
    cy.request({
      method: "GET",
      url: "https://api.escuelajs.co/api/v1/categories/999",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.not.be.null;
      expect(response.body.name).to.eq("EntityNotFoundError");
    });
  });
  it("TC005-Get Kategori dengan ID Non-Numerik", () => {
    cy.request({
      method: "GET",
      url: "https://api.escuelajs.co/api/v1/categories/jemyka",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.error).to.eq("Bad Request");
      expect(response.body.message).to.eq(
        "Validation failed (numeric string is expected)",
      );
    });
  });
  it("TC006-Membuat Kategori Baru", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories/",
      body: {
        name: "T-Shirt Burgundy",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("name");
    });
  });
  it("TC007-Membuat Kategori Tanpa Field Name", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories/",
      body: {
        image: "https://placeimg.com/640/480/any",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  });
  it("TC008-Membuat kategori dengan invalid URL image", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories/",
      body: {
        name: "Perkakas",
        image: "bukan-url-gambar",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property("message");
    });
  });
  it("TC009-Update Kategori dengan ID Valid", () => {
    cy.request({
      method: "PUT",
      url: "https://api.escuelajs.co/api/v1/categories/3",
      body: {
        name: "Fresh Beverages Update",
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("id");
    });
  });
  it("TC010-Update Kategori dengan ID Invalid", () => {
    cy.request({
      method: "PUT",
      url: "https://api.escuelajs.co/api/v1/categories/90900",
      body: {
        name: "Avocado Juice Update",
      },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404]);
      expect(response.body).to.have.property("message");
    });
  });
  it("TC011-Get Produk dengan ID Kategori 55", () => {
    cy.request({
      method: "GET",
      url: "https://api.escuelajs.co/api/v1/categories/55/products",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
  it("TC012-Hapus Kategori by ID", () => {
    cy.request({
      method: "DELETE",
      url: "https://api.escuelajs.co/api/v1/categories/1",
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.code).to.eq("SQLITE_CONSTRAINT_FOREIGNKEY");
    });
  });
});
