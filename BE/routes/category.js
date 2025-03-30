const express = require("express");
const router = express.Router();
const { getAllcategories } = require("../controllers/category");

router.get("/", getAllcategories);

module.exports = router;
