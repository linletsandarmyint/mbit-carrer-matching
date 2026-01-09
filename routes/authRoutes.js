const express = require("express");
const { register, login } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected route example
router.get("/profile", protect, (req, res) => {
  // req.user comes from middleware
  res.status(200).json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;
