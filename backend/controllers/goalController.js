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

module.exports = {
  getGoal,
  saveGoal,
};