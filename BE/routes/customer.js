const express = require("express");
const router = express.Router();
const { getCustomers } = require("../controllers/customer");

router.get("/", getCustomers);

module.exports = router;
