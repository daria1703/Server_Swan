const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");

require("dotenv").config();

/* Connecting to the database before each test. */
beforeEach(async () => {
    await mongoose.connect(process.env.DB_CONNECTION);
});

/* Closing database connection after each test. */
afterEach(async () => {
    await mongoose.connection.close();
});

//Products

describe("GET /products", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/products"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /products", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/products"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("PUT /products/:productId", () => {
    it("should return code 200", async () => {
        const res = await request(app).put(
            "/products/626308aa10824eeeb6ba36b3"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /products/:productId", () => {
    it("should return code 200", async () => {
        const res = await request(app).delete(
            "/products/123"
        );
        expect(res.statusCode).toBe(200);
    });
});

//Category

describe("GET /categories", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/categories"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /categories", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/categories"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /categories/:categoryId", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/categories/63c31f7addc5826aa60bab49"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("PATCH /categories/:categoryId", () => {
    it("should return code 200", async () => {
        const res = await request(app).patch(
            "/categories/:categoryId"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("DELETE /categories/:categoryId", () => {
    it("should return code 200", async () => {
        const res = await request(app).delete(
            "/categories/63c31f061ebe1c2f59a7cb93"
        );
        expect(res.statusCode).toBe(200);
    });
});

//Comments

describe("GET /comments", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/comments"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /comments", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/comments"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /comments/:commentId", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/comments/:commentId"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("PATCH /comments/:commentId", () => {
    it("should return code 200", async () => {
        const res = await request(app).patch(
            "/comments/63775e44e8bbd325c910f659"
        );
        expect(res.statusCode).toBe(200);
    });
});

// // Orders 

describe("GET /orders", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/orders"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /orders", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/orders"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("PATCH /orders/:ordersId", () => {
    it("should return code 200", async () => {
        const res = await request(app).patch(
            "/orders/636545c96b34f84998e58534"
        );
        expect(res.statusCode).toBe(200);
    });
});

//Products

describe("GET /products", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/products"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /products", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/products"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /products/:productId", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/products/6217ffe60b90cf09428fac55"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("PATCH /products/:productId", () => {
    it("should return code 200", async () => {
        const res = await request(app).patch(
            "/products/6217ffe60b90cf09428fac55"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /products", () => {
    it("should create a product", async () => {
        const res = await request(app).post("/products").send({
            product_name: "Przedmiot",
            description: "Opis",
            short_description: "Short description",
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.product_name).toBe("Przedmiot");
        expect(res.body.description).toBe("Opis");
        expect(res.body.short_description).toBe("Short description");
    });
});

describe("POST /categories", () => {
    it("should create a category", async () => {
        const res = await request(app).post("/categories").send({
            categoryName: "Kategoria",
            subcategoryName: "Podkategoria"
        });
        expect(res.statusCode).toBe(200);
        expect(res.body.categoryName).toBe("Kategoria");
        expect(res.body.subcategoryName).toBe("Podkategoria");
    });
});


describe("GET /resetPassword/:id/:token", () => {
    it("should return code 404", async () => {
        const res = await request(app).get(
            "/resetPassword/63acab8c7c29d5d710b4c473/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZ21haWwuY29tIiwiaWF0IjoxNjczNzk2Njc3LCJleHAiOjE2NzM3OTk2Nzd9.unA9-LFmcMkYHdG6rUF-QXWgjlDOjq5t9YVdPqz6L8o"
        );
        expect(res.statusCode).toBe(404);
    });
});


describe("PATCH /products/:productId", () => {
    it("should update a product", async () => {
        const res = await request(app)
            .patch("/products/626308aa10824eeeb6ba36b3")
            .send({
                product_name: "Pierścionek pozłacany",
                price: 2199,
                description: "Chwila zaręczyn przypieczętowana diamentowym blaskiem. Bezpretensjonalna, oparta na dyskretnej elegancji forma pierścionka zaręczynowego z klasycznego złota, eksponuje czyste piękno brylantu. Najszlachetniejszy z kamieni dzięki oprawie sześciu krap, może w nieskrępowany sposób lśnić i uwodzić blaskiem.",
            });
        expect(res.statusCode).toBe(200);
    });
});

//User

describe("GET /users", () => {
    it("should return code 200", async () => {
        const res = await request(app).get(
            "/users"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("GET /user", () => {
    it("should return code 404", async () => {
        const res = await request(app).get(
            "/user"
        );
        expect(res.statusCode).toBe(404);
    });
});

describe("POST /users/login", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/users/login"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /users/userData", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/users/userData"
        );
        expect(res.statusCode).toBe(200);
    });
});

describe("POST /users/forgetPassword", () => {
    it("should return code 200", async () => {
        const res = await request(app).post(
            "/users/forgetPassword"
        );
        expect(res.statusCode).toBe(200);
    });
});
