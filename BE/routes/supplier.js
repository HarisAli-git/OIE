const express = require("express");
const router = express.Router();
const { getAllSuppliers } = require("../controllers/supplier");

router.get("/", getAllSuppliers);

module.exports = router;
