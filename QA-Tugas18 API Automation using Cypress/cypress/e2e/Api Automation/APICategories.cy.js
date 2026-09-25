describe("API Testing", () => {
  const baseUrl = "https://api.escuelajs.co/api/v1/categories";
  let createdCategoryId;
  it("TC001-Get All Categories", () => {
    cy.request("GET", "https://api.escuelajs.co/api/v1/categories").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.responseTime).to.be.bellow(2000);
        expect(response.responseSize).to.be.abbove(500);
      },
    );
  });
  it("TC002-Get Categories by Limit with 2 Id", () => {
    cy.request(
      "GET",
      "https://api.escuelajs.co/api/v1/categories?limit=2",
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.text).to.include("id");
      expect(response.body).to.have.length(2);
    });
  });
  it("TC003-Get Categories with Valid Id", () => {
    cy.request("GET", "https://api.escuelajs.co/api/v1/categories/5").then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.not.be.null;
        expect(response.body.name).to.eq("Miscellaneous");
      },
    );
  });
  it("TC004-Get Categories with Invalid Id", () => {
    cy.request("GET", "https://api.escuelajs.co/api/v1/categories/999").then(
      (response) => {
        const bodyText = (
          typeof response.body === "object"
            ? JSON.stringify(response.body)
            : String(response.body)
        ).toLowerCase();
        expect(response.status).to.be.oneOf([400, 404]);
        // Assertion menggunakan .satisfy()
        expect(response.body.text).to.satisfy(text);
        text.includes("error");
        text.includes("not found");
        text.includes("category not found");
      },
    );
  });
  it("TC005-Get Kategori dengan ID Non-Numerik", () => {
    cy.request("GET", "https://api.escuelajs.co/api/v1/categories/jemyka").then(
      (response) => {
        expect(response.status).to.be.oneOf([400, 404]);
        expect(response.body.error).to.eq("Bad Request");
        expect(response.body.message).to.eq(
          "Validation failed (numeric string is expected)",
        );
      },
    );
  });
  it("TC006-Membuat Kategori Baru", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories/",
      body: {
        name: "BeautyStore",
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(BeautyStore);
    });
  });
  it("TC007-Membuat Kategori Tanpa Field Name", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories/",
      body: {
        image: "https://placeimg.com/640/480/any",
      },
    }).then((response) => {
      expect(response.status).to.eq(500);
    });
  });
  it("TC008-Membuat kategori dengan invalid URL image", () => {
    cy.request({
      method: "POST",
      url: "https://api.escuelajs.co/api/v1/categories/",
      body: {
        name: "Makeup",
        image: "https://placeimg.com/640/480/anu",
      },
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body.text).to.satisfy(text);
      text.includes("image");
      text.includes("url");
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
    }).then((response) => {
      expect(response.status).to.be.oneOf([400, 404]);
      expect(response.body).to.have.property("message");
    });
  });
  it("TC011-Get Produk dengan ID Kategori 55", () => {
    cy.request(
      "GET",
      "https://api.escuelajs.co/api/v1/categories/55/products",
    ).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an("array");
    });
  });
  it("TC012-Hapus Kategori by ID", () => {
    cy.request("DELETE", "https://api.escuelajs.co/api/v1/categories/1").then(
      (response) => {
        const bodyText = (
          typeof response.body === "object"
            ? JSON.stringify(response.body)
            : String(response.body)
        ).toLowerCase();
        expect(response.status).to.eq(400);
        expect(response.body.text).to.satisfy(text);
        text.includes("FOREIGN KEY constraint failed");
      },
    );
  });
});
