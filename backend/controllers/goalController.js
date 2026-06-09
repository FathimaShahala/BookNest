const Book = require("../models/Book");
const Goal = require("../models/Goal");

const getGoal = async (req, res) => {
  try {
    let goal = await Goal.findOne({
      userId: req.user.id,
    });

    if (!goal) {
      goal = await Goal.create({
        userId: req.user.id,
      });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const saveGoal = async (req, res) => {
  try {
    let goal = await Goal.findOne({
      userId: req.user.id,
    });

    if (!goal) {
      goal = await Goal.create({
        userId: req.user.id,
        yearlyGoal: req.body.yearlyGoal,
        monthlyGoal: req.body.monthlyGoal,
      });
    } else {
      goal.yearlyGoal = req.body.yearlyGoal;
      goal.monthlyGoal = req.body.monthlyGoal;

      await goal.save();
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getGoalProgress = async (req, res) => {
  try {
    const goal = await Goal.findOne({
      userId: req.user.id,
    });

    const completedBooks =
      await Book.countDocuments({
        userId: req.user.id,
        readingStatus: "Completed",
      });

    const yearlyGoal =
      goal?.yearlyGoal || 0;

    const monthlyGoal =
      goal?.monthlyGoal || 0;

    const yearlyProgress =
      yearlyGoal > 0
        ? Math.round(
            (completedBooks /
              yearlyGoal) *
              100
          )
        : 0;

    res.json({
      yearlyGoal,
      monthlyGoal,
      completedBooks,
      yearlyProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getGoal,
  saveGoal,
  getGoalProgress,
};