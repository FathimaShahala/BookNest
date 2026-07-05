const express = require("express");

const router = express.Router();

const {
  addReadingSession,
  getReadingSessions,
  updateReadingSession,
  deleteReadingSession,
} = require("../controllers/trackerController");

const protect = require("../middleware/authMiddleware");

router.use(protect);

router.get("/", getReadingSessions);

router.post("/", addReadingSession);
router.put("/:id", updateReadingSession);
router.delete("/:id", deleteReadingSession);

module.exports = router;
