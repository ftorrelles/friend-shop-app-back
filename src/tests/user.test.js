const request = require("supertest");
const app = require("../app");
require("../models");
let userId;
let token;

test("POST /api/v1/users should create an user", async () => {
    const newUser = {
        firstName: "Francisco",
        lastName: "Torrelles",
        email: "torrellesf2@gmail.com",
        password: "cisco1234",
        phone: "12123224",
    };
    const res = await request(app).post("/api/v1/users").send(newUser);
    userId = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.firstName).toBe(newUser.firstName);
});

test("POST /api/v1/users/login should do login", async () => {
    const user = {
        email: "torrellesf2@gmail.com",
        password: "cisco1234",
    };
    const res = await request(app).post("/api/v1/users/login").send(user);
    token = res.body.token;
    expect(res.status).toBe(200);
    expect(res.body.user.email).toBe(user.email);
    expect(res.body.token).toBeDefined();
});

test("POST /api/v1/users/login with invalid credentials should return 401", async () => {
    const user = {
        email: "torrellesf2@gmail.com",
        password: "wrongpassword",
    };
    const res = await request(app).post("/api/v1/users/login").send(user);
    expect(res.status).toBe(401);
});

test("GET ALL /api/v1/users should return all user", async () => {
    const res = await request(app)
        .get("/api/v1/users")
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
});

test("PUT /api/v1/users/:id should update one user", async () => {
    const body = {
        firstName: "Francisco A",
    };
    const res = await request(app)
        .put(`/api/v1/users/${userId}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(body.firstName);
});

test("DELETE /api/v1/users/:id should delete one user", async () => {
    const res = await request(app)
        .delete(`/api/v1/users/${userId}`)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});
