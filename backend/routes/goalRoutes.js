const express = require("express");
const router = express.Router();


const {
  getGoal,
  saveGoal,
} = require("../controllers/goalController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getGoal);

router.post("/", protect, saveGoal);

module.exports = router;