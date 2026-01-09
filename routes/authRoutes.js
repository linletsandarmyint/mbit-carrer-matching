const express = require("express");
const { register, login } = require("../controllers/authController");

console.log("REGISTER TYPE:", typeof register);
console.log("LOGIN TYPE:", typeof login);

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
