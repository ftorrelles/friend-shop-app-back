const request = require("supertest");
const app = require("../app");
const Product = require("../models/Product");
require("../models");
let cartId;
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
test("POST /api/v1/carts should create a cart", async () => {
    const newProduct = await Product.create({
        title: "MacBook Air 13.3'' Laptop - Apple M1 chip",
        description:
            "It’s here. Our first chip designed specifically for Mac. Packed with an astonishing 16 billion transistors, the Apple M1 system on a chip (SoC) integrates the CPU, GPU, Neural Engine, I/O, and so much more onto a single tiny chip. With incredible performance, custom technologies, and industry-leading power efficiency, M1 is not just a next step for Mac — it’s another level entirely.",
        price: 1399,
    });
    const newCart = {
        quantity: 4,
        productId: newProduct.id,
    };
    const res = await request(app)
        .post("/api/v1/carts")
        .send(newCart)
        .set("Authorization", `Bearer ${token}`);
    cartId = res.body.id;
    await newProduct.destroy();
    expect(res.status).toBe(201);
    expect(res.body.quantity).toBe(newCart.quantity);
});

test("GET ALL /api/v1/carts should return all carts", async () => {
    const res = await request(app)
        .get("/api/v1/carts")
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(1);
});

test("PUT /api/v1/carts/:id should update one cart", async () => {
    const body = {
        quantity: 5,
    };
    const res = await request(app)
        .put(`/api/v1/carts/${cartId}`)
        .send(body)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.quantity).toBe(body.quantity);
});

test("DELETE /api/v1/carts/:id should delete one cart", async () => {
    const res = await request(app)
        .delete(`/api/v1/carts/${cartId}`)
        .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(204);
});
