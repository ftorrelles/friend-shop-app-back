const {
    getAll,
    create,
    remove,
} = require("../controllers/productImg.controllers");
const express = require("express");
const upload = require("../utils/multer");
const verifyJWT = require("../utils/verifyJWT");

const productImgRouter = express.Router();

productImgRouter
    .route("/")
    .get(verifyJWT, getAll)
    .post(upload.single("image"), verifyJWT, create);

productImgRouter.route("/:id").delete(verifyJWT, remove);

module.exports = productImgRouter;
