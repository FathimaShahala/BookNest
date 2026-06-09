const Book = require("../models/Book");

const getStatistics = async (
  req,
  res
) => {
  try {
    const books =
      await Book.find({
        userId: req.user._id,
      });

    const totalBooks =
      books.length;

    const completedBooks =
      books.filter(
        (book) =>
          book.readingStatus ===
          "Completed"
      ).length;

    const currentlyReading =
      books.filter(
        (book) =>
          book.readingStatus ===
          "Currently Reading"
      ).length;

    const totalPagesRead =
      books.reduce(
        (sum, book) =>
          sum +
          (book.currentPage || 0),
        0
      );

    const ratings =
      books.filter(
        (book) => book.rating > 0
      );

    const averageRating =
      ratings.length > 0
        ? (
            ratings.reduce(
              (sum, book) =>
                sum +
                book.rating,
              0
            ) /
            ratings.length
          ).toFixed(1)
        : 0;

    const genreCounts = {};

    books.forEach((book) => {
      if (!book.genre) return;

      genreCounts[
        book.genre
      ] =
        (genreCounts[
          book.genre
        ] || 0) + 1;
    });

    let favoriteGenre =
      "N/A";

    let maxGenreCount = 0;

    for (const genre in genreCounts) {
      if (
        genreCounts[genre] >
        maxGenreCount
      ) {
        maxGenreCount =
          genreCounts[genre];

        favoriteGenre = genre;
      }
    }

    res.json({
      totalBooks,
      completedBooks,
      currentlyReading,
      totalPagesRead,
      averageRating,
      favoriteGenre,
      genreCounts,
    });
  } catch (error) {
    res.status(500).json({
      message:
        error.message,
    });
  }
};

module.exports = {
  getStatistics,
};