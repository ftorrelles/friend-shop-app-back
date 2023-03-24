const express = require("express");
const categoryRouter = require("./category.router");
const productRouter = require("./product.router");
const productImgRouter = require("./productImg.router");
const userRouter = require("./user.router");
const router = express.Router();

router.use("/users", userRouter);

router.use("/categories", categoryRouter);

router.use("/products", productRouter);

router.use("/productImg", productImgRouter);

module.exports = router;
