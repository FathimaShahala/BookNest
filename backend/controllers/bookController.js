const Book = require("../models/Book");
const {
  checkAchievements,
} = require("./achievementController");
const {
  updateStreak,
} = require(
  "./streakController"
);

// Create Book
const createBook = async (req, res) => {
  try {
    const book = await Book.create({
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      description: req.body.description,
      coverImage: req.body.coverImage,
      totalPages: req.body.totalPages,
      currentPage: req.body.currentPage || 0,
      readingStatus:
        req.body.readingStatus || "Want To Read",
      rating: req.body.rating || 0,
      notes: req.body.notes || [],
      userId: req.user._id,
      isFavorite:
  req.body.isFavorite || false,
    });

    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find({
      userId: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(books);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Book By ID
const getBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    book.title =
      req.body.title ?? book.title;

    book.author =
      req.body.author ?? book.author;

    book.genre =
      req.body.genre ?? book.genre;

    book.description =
      req.body.description ??
      book.description;

    book.coverImage =
      req.body.coverImage ??
      book.coverImage;

    book.totalPages =
      req.body.totalPages ??
      book.totalPages;

    book.currentPage =
      req.body.currentPage ??
      book.currentPage;

    book.readingStatus =
      req.body.readingStatus ??
      book.readingStatus;

    book.rating =
      req.body.rating ??
      book.rating;

    book.notes =
      req.body.notes ??
      book.notes;
book.isFavorite =
  req.body.isFavorite ??
  book.isFavorite;
    const updatedBook =
  await book.save();

await checkAchievements(
  req.user._id
);
await updateStreak(
  req.user._id
);

res.json(updatedBook);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
      });
    }

    await book.deleteOne();

    res.json({
      message:
        "Book deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook,
};