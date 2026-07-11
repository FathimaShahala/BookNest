const ReadingSession = require("../models/ReadingSession");

const Book = require("../models/Book");

/* ===========================
   Add Reading Session
=========================== */

const addReadingSession = async (req, res) => {
  try {
        console.log("===============");

 console.log(req.body);
console.log("BOOK:", req.body.book); 
    console.log("===============");

  const {
      book,
      date,
      startPage,
      endPage,
      minutesRead,
      mood,
      notes,
    } = req.body;

    const pagesRead =
      Number(endPage) - Number(startPage) + 1;
console.log("BOOK VARIABLE:", book);

    const session = await ReadingSession.create({
      userId: req.user._id,

      book,

      date,

      startPage: Number(startPage),

      endPage: Number(endPage),

      pagesRead,

      minutesRead: Number(minutesRead),

      mood,

      notes,
    });
console.log("SESSION CREATED:", session);
    await Book.findByIdAndUpdate(book, {
      currentPage: endPage,
    });

    const populatedSession = await ReadingSession.findById(session._id)
      .populate(
        "book",
        "title author coverImage totalPages genre"
      );

    const result = populatedSession.toObject();

    res.status(201).json(result);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
/* ===========================
   Get Reading Sessions
=========================== */

const getReadingSessions = async (req, res) => {
  try {
    const sessions = await ReadingSession.find({
      userId: req.user._id,
    })
      .populate(
        "bookId",
        "title author coverImage totalPages genre"
      )
      .sort({ date: -1 });

    const formatted = sessions.map((session) => {
      const item = session.toObject();

      item.book = item.bookId;
      delete item.bookId;

      item.minutesRead = item.readingTime;
      delete item.readingTime;

      return item;
    });

    res.json(formatted);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ===========================
   Delete
=========================== */

const deleteReadingSession = async (req, res) => {
  try {
    const session = await ReadingSession.findOne({
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
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Reading Session

const updateReadingSession = async (req, res) => {
  try {
    const session = await ReadingSession.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        message: "Session not found",
      });
    }

    session.date = req.body.date ?? session.date;

    session.startPage = Number(req.body.startPage ?? session.startPage);

    session.endPage = Number(req.body.endPage ?? session.endPage);

    session.readingTime = Number(req.body.minutesRead ?? session.readingTime);

    session.mood = req.body.mood ?? session.mood;

    session.notes = req.body.notes ?? session.notes;

    session.pagesRead = session.endPage - session.startPage + 1;

    if (req.body.book) {
      session.bookId = req.body.book;
    }

    await session.save();

    await Book.findByIdAndUpdate(session.book, {
      currentPage: session.endPage,
    });

    const updated = await ReadingSession.findById(session._id).populate(
      "bookId",
      "title author coverImage totalPages genre",
    );

    const result = updated.toObject();

    result.book = result.bookId;
    delete result.bookId;

    result.minutesRead = result.readingTime;
    delete result.readingTime;

    res.json(result);
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
  updateReadingSession,
};
