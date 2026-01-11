const express = require("express");
const { getJobs,getMatchedJobs } = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/",getJobs);
router.get("/matched", protect, getMatchedJobs);

module.exports = router;
