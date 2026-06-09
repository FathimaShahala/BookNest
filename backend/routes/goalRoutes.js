const express = require("express");
const router = express.Router();


const {
  getGoal,
  saveGoal,
    getGoalProgress,
} = require("../controllers/goalController");

const protect = require("../middleware/authMiddleware");

router.get("/", protect, getGoal);

router.post("/", protect, saveGoal);
router.get("/progress", protect, getGoalProgress);  
module.exports = router;