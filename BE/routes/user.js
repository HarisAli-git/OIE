const { createUser, getUsers } = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);

module.exports = router;
