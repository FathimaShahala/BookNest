const express = require("express");

const router = express.Router();

const {
  saveHeatmap,
  getHeatmap,
} = require("../controllers/heatmapController");

const authMiddleware = require("../middleware/authMiddleware");

// Save daily reading
router.post("/", authMiddleware, saveHeatmap);

// Get all heatmap data
router.get("/", authMiddleware, getHeatmap);

module.exports = router;