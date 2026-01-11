const express = require("express");
const {
  getJobs,
  getMatchedJobs,
  createJob,
} = require("../controllers/jobController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();
router.get("/", getJobs);
router.get("/matched", protect, getMatchedJobs);
router.post("/", protect, createJob);
module.exports = router;
