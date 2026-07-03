const Review = require("../models/Review");

// =============================
// Create Review
// =============================
const createReview = async (req, res) => {
  try {
    const {
      bookId,
      rating,
      title,
      review,
    } = req.body;

    // Validation
    if (!bookId || !rating || !title || !review) {
      return res.status(400).json({
        message: "All fields are required.",
      });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        message: "Rating must be between 1 and 5.",
      });
    }

    // Prevent duplicate review
    const existingReview = await Review.findOne({
      userId: req.user.id,
      bookId,
    });

    if (existingReview) {
      return res.status(400).json({
        message:
          "You have already reviewed this book.",
      });
    }

    const newReview = await Review.create({
      userId: req.user.id,
      bookId,
      rating,
      title,
      review,
    });

    res.status(201).json(newReview);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// Get Reviews By Book
// =============================
const getBookReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      bookId: req.params.bookId,
    })
.populate("userId", "name _id")      .sort({
        createdAt: -1,
      });

    res.json(reviews);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// Update Review
// =============================
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    if (
      review.userId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized.",
      });
    }

    if (
      req.body.rating &&
      (req.body.rating < 1 ||
        req.body.rating > 5)
    ) {
      return res.status(400).json({
        message:
          "Rating must be between 1 and 5.",
      });
    }

    review.rating =
      req.body.rating ?? review.rating;

    review.title =
      req.body.title ?? review.title;

    review.review =
      req.body.review ?? review.review;

    const updatedReview =
      await review.save();

    res.json(updatedReview);

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =============================
// Delete Review
// =============================
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(
      req.params.id
    );

    if (!review) {
      return res.status(404).json({
        message: "Review not found.",
      });
    }

    if (
      review.userId.toString() !==
      req.user.id
    ) {
      return res.status(403).json({
        message: "Not authorized.",
      });
    }

    await review.deleteOne();

    res.json({
      message:
        "Review deleted successfully.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getBookReviews,
  updateReview,
  deleteReview,
};