const { getAllProducts } = require("../controllers/product");

const express = require("express");
const router = express.Router();

router.get("/", getAllProducts);

module.exports = router;
