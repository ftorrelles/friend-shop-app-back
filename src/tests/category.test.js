const request = require("supertest");
const app = require("../app");
require("../models");
let categoryId;
let token;

beforeAll(async () => {
    const credentials = {
        email: "testuser@gmail.com",
        password: "test1234",
    };
    const res = await request(app)
        .post("/api/v1/users/login")
        .send(credentials);
    token = res.body.token;
});
test("POST /api/v1/categories should create a categories", async () => {
    const newCategory = {
        name: "computers",
    };
    const res = await request(app)
        .post("/api/v1/categories")
        .send(newCategory)
        .set("Authorization", `Bearer ${token}`);
    categoryId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.name).toBe(newCategory.name);
});

test("GET ALL /api/v1/categories should return all categories", async () => {
    const res = await request(app).get("/api/v1/categories");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /api/v1/categories/:id should update one category", async () => {
    const body = {
        name: "computers",
    };
    const res = await request(app)
        .put(`/api/v1/categories/${categoryId}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(body.name);
});

test("DELETE /api/v1/categories/:id should delete one category", async () => {
    const res = await request(app)
        .delete(`/api/v1/categories/${categoryId}`)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});
