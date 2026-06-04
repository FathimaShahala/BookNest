const express = require("express");

const {
  createBook,
  getBooks,
  getBook,
  updateBook,
  deleteBook
} = require(
  "../controllers/bookController"
);

const {
  protect
} = require(
  "../middleware/authMiddleware"
);

const router =
  express.Router();

router
  .route("/")
  .post(protect, createBook)
  .get(protect, getBooks);

router
  .route("/:id")
  .get(protect, getBook)
  .put(protect, updateBook)
  .delete(protect, deleteBook);

module.exports = router;