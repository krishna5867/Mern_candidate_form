const express = require("express");

const { createUser, getUsers } = require("../controller/userController");
const router = express.Router();

router.post("/api/v1/form", ...createUser);
router.get("/api/v1/users", getUsers);

module.exports = router;
