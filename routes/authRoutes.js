const express = require("express");
const { register } = require("../controllers/authController");

console.log("REGISTER TYPE:", typeof register);

const router = express.Router();
router.post("/register", register);

module.exports = router;
