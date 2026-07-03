const ReadingSession = require("../models/ReadingSession");
const Book = require("../models/Book");

// ===============================
// Add Reading Session
// ===============================
const addReadingSession = async (req, res) => {
  try {
    const {
      bookId,
      date,
      startPage,
      endPage,
      readingTime,
      mood,
      notes,
    } = req.body;

    const book = await Book.findOne({
      _id: bookId,
      userId: req.user._id,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    const pagesRead =
      Number(endPage) - Number(startPage);

    if (pagesRead <= 0) {
      return res.status(400).json({
        message: "End page must be greater than start page",
      });
    }

    const session =
      await ReadingSession.create({
        userId: req.user._id,
        bookId,
        date,
        startPage,
        endPage,
        pagesRead,
        readingTime,
        mood,
        notes,
      });

    // Automatically update the book's current page
    book.currentPage = endPage;

    // Automatically mark completed
    if (endPage >= book.totalPages) {
      book.currentPage = book.totalPages;
      book.readingStatus = "Completed";
    }

    await book.save();

    res.status(201).json(session);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Get Reading Sessions
// ===============================
const getReadingSessions = async (req, res) => {
  try {
    const sessions =
      await ReadingSession.find({
        userId: req.user._id,
      })
        .populate(
          "bookId",
          "title author coverImage"
        )
        .sort({
          date: -1,
        });

    res.json(sessions);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Delete Session
// ===============================
const deleteReadingSession = async (
  req,
  res
) => {
  try {
    const session =
      await ReadingSession.findOne({
        _id: req.params.id,
        userId: req.user._id,
      });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    await session.deleteOne();

    res.json({
      message:
        "Reading session deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ===============================
// Dashboard Summary
// ===============================
const getTrackerSummary = async (
  req,
  res
) => {
  try {
    const sessions =
      await ReadingSession.find({
        userId: req.user._id,
      });

    const totalSessions =
      sessions.length;

    const totalPages =
      sessions.reduce(
        (sum, session) =>
          sum + session.pagesRead,
        0
      );

    const totalTime =
      sessions.reduce(
        (sum, session) =>
          sum +
          (session.readingTime || 0),
        0
      );

    const today =
      new Date()
        .toISOString()
        .split("T")[0];

    const todayPages =
      sessions
        .filter(
          (session) =>
            new Date(session.date)
              .toISOString()
              .split("T")[0] === today
        )
        .reduce(
          (sum, session) =>
            sum + session.pagesRead,
          0
        );

    res.json({
      totalSessions,
      totalPages,
      totalTime,
      todayPages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addReadingSession,
  getReadingSessions,
  deleteReadingSession,
  getTrackerSummary,
};