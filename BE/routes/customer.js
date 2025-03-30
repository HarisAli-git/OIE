const express = require("express");
const router = express.Router();
const { getAllCustomers } = require("../controllers/customer");

router.get("/", getAllCustomers);

module.exports = router;
