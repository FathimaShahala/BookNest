const mongoose = require("mongoose");

const readingSessionSchema =
  new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true,
      },

      date: {
        type: Date,
        required: true,
        default: Date.now,
      },

      startPage: {
        type: Number,
        required: true,
      },

      endPage: {
        type: Number,
        required: true,
      },

      pagesRead: {
        type: Number,
        required: true,
      },

      readingTime: {
        type: Number,
        default: 0,
      },

      mood: {
        type: String,
        enum: [
          "Excellent",
          "Good",
          "Average",
          "Tired",
          "Distracted",
        ],
        default: "Good",
      },

      notes: {
        type: String,
        default: "",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "ReadingSession",
  readingSessionSchema
);