const express = require("express");

const router = express.Router();

const {
  addReadingSession,
  getReadingSessions,
  deleteReadingSession,
  getTrackerSummary,
} = require("../controllers/readingSessionController");

const protect = require("../middleware/authMiddleware");

// ===============================
// Reading Tracker Summary
// GET /api/reading-tracker/summary
// ===============================
router.get(
  "/summary",
  protect,
  getTrackerSummary
);

// ===============================
// Get All Sessions
// GET /api/reading-tracker
// ===============================
router.get(
  "/",
  protect,
  getReadingSessions
);

// ===============================
// Add Session
// POST /api/reading-tracker
// ===============================
router.post(
  "/",
  protect,
  addReadingSession
);

// ===============================
// Delete Session
// DELETE /api/reading-tracker/:id
// ===============================
router.delete(
  "/:id",
  protect,
  deleteReadingSession
);

module.exports = router;