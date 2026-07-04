const mongoose = require("mongoose");

const heatmapSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    pagesRead: {
      type: Number,
      default: 0,
    },

    minutesRead: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ReadingHeatmap",
  heatmapSchema
);