const { createUser, getUsers } = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);

module.exports = router;
