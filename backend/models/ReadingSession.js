const mongoose = require("mongoose");

const readingSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    date: {
      type: Date,
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
      default: 0,
    },

    minutesRead: {
      type: Number,
      default: 0,
    },

    mood: {
      type: String,
      default: "😊",
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