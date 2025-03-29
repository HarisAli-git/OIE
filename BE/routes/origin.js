const express = require("express");
const router = express.Router();
const { getAllOrigins } = require("../controllers/origin.controller");

router.get("/", getAllOrigins);

module.exports = router;
