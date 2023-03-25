const express = require("express");
const purchaseRouter = require("./purchase.router");
const cartRouter = require("./cart.router");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const productImgRouter = require("./productImg.router");
const userRouter = require("./user.router");
const router = express.Router();

router.use("/users", userRouter);

router.use("/categories", categoryRouter);

router.use("/products", productRouter);

router.use("/productImg", productImgRouter);

router.use("/carts", cartRouter);

router.use("/purchases", purchaseRouter);

module.exports = router;
