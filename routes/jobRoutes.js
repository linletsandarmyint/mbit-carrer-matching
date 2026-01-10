const express = require("express");
const { getMatchedJobs } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/matched", protect, getMatchedJobs);

module.exports = router;
