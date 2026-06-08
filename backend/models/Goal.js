const mongoose = require("mongoose");

const goalSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types
            .ObjectId,
        ref: "User",
        required: true,
      },

      yearlyGoal: {
        type: Number,
        default: 0,
      },

      monthlyGoal: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Goal",
    goalSchema
  );