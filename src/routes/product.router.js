const {
    getAll,
    create,
    getOne,
    remove,
    update,
    setProductImages,
} = require("../controllers/product.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");
const verifyAdmin = require("../utils/verifyAdmin");

const productRouter = express.Router();

productRouter.route("/").get(getAll).post(verifyJWT, verifyAdmin, create);

productRouter
    .route("/:id")
    .get(getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

productRouter.route("/:id/images").post(verifyJWT, setProductImages);

module.exports = productRouter;
