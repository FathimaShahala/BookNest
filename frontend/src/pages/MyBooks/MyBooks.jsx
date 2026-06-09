import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  getBooks,
  deleteBook,
} from "../../services/bookService";

import BookCard from "../../components/BookCard/BookCard";
import StatsSection from "../../components/StatsSection/StatsSection";

import DashboardLayout from "../../layouts/DashboardLayout";

import "./MyBooks.css";

function MyBooks() {

  const { user } =
    useAuth();

  const [
    books,
    setBooks,
  ] = useState([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    activeFilter,
    setActiveFilter,
  ] = useState("All");

  const [
    genre,
    setGenre,
  ] = useState("");

  const [
    sort,
    setSort,
  ] = useState("");

  useEffect(() => {

    const loadBooks =
      async () => {

        try {

          const data =
            await getBooks(
              user.token
            );

          setBooks(data);

        } catch (error) {

          console.log(error);

        }
      };

    if (user) {
      loadBooks();
    }

  }, [user]);

  const handleDelete =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "Delete this book?"
        );

      if (!confirmDelete)
        return;

      try {

        await deleteBook(
          id,
          user.token
        );

        setBooks(
          books.filter(
            (book) =>
              book._id !== id
          )
        );

      } catch (error) {

        console.log(error);

      }
    };

  const genres = [
    ...new Set(
      books.map(
        (book) =>
          book.genre
      )
    ),
  ];

  const totalBooks =
    books.length;

  const wantToReadCount =
    books.filter(
      (book) =>
        book.readingStatus ===
        "Want To Read"
    ).length;

  const readingCount =
    books.filter(
      (book) =>
        book.readingStatus ===
        "Currently Reading"
    ).length;

  const nextCount =
    books.filter(
      (book) =>
        book.readingStatus ===
        "Next To Read"
    ).length;

  const completedCount =
    books.filter(
      (book) =>
        book.readingStatus ===
        "Completed"
    ).length;

  const favoritesCount =
    books.filter(
      (book) =>
        book.isFavorite
    ).length;

  let filteredBooks =
    books.filter(
      (book) => {

        const searchMatch =

          book.title
            .toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||

          book.author
            .toLowerCase()
            .includes(
              search.toLowerCase()
            );

        let statusMatch =
          true;

        if (
          activeFilter ===
          "Favorites"
        ) {

          statusMatch =
            book.isFavorite;

        } else if (
          activeFilter !==
          "All"
        ) {

          statusMatch =
            book.readingStatus ===
            activeFilter;
        }

        const genreMatch =

          genre === "" ||

          book.genre ===
          genre;

        return (
          searchMatch &&
          statusMatch &&
          genreMatch
        );
      }
    );

  switch (sort) {

    case "title":

      filteredBooks.sort(
        (a, b) =>
          a.title.localeCompare(
            b.title
          )
      );
      break;

    case "author":

      filteredBooks.sort(
        (a, b) =>
          a.author.localeCompare(
            b.author
          )
      );
      break;

    case "rating":

      filteredBooks.sort(
        (a, b) =>
          b.rating -
          a.rating
      );
      break;

    case "pages":

      filteredBooks.sort(
        (a, b) =>
          b.totalPages -
          a.totalPages
      );
      break;

    default:
      break;
  }

  return (
    <DashboardLayout>

      <div className="books-page">

        <div className="books-header">

          <div>

            <h1>
              📚 My Bookshelf
            </h1>

          </div>

          <Link
            to="/add-book"
            className="add-book-btn"
          >
            + Add Book
          </Link>

        </div>

        <StatsSection
          books={books}
        />

        <div className="status-filters">

          <button
            className={
              activeFilter ===
              "All"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "All"
              )
            }
          >
            All ({totalBooks})
          </button>

          <button
            className={
              activeFilter ===
              "Want To Read"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Want To Read"
              )
            }
          >
            📚 Want To Read
            ({wantToReadCount})
          </button>

          <button
            className={
              activeFilter ===
              "Currently Reading"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Currently Reading"
              )
            }
          >
            📖 Reading
            ({readingCount})
          </button>

          <button
            className={
              activeFilter ===
              "Next To Read"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Next To Read"
              )
            }
          >
            ⏭ Next
            ({nextCount})
          </button>

          <button
            className={
              activeFilter ===
              "Completed"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Completed"
              )
            }
          >
            ✅ Completed
            ({completedCount})
          </button>

          <button
            className={
              activeFilter ===
              "Favorites"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveFilter(
                "Favorites"
              )
            }
          >
            ❤️ Favorites
            ({favoritesCount})
          </button>

        </div>

        <div className="filters">

          <input
            type="text"
            placeholder="🔍 Search by title or author"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            value={genre}
            onChange={(e) =>
              setGenre(
                e.target.value
              )
            }
          >
            <option value="">
              All Genres
            </option>

            {genres.map(
              (genreName) => (
                <option
                  key={genreName}
                  value={genreName}
                >
                  {genreName}
                </option>
              )
            )}
          </select>

          <select
            value={sort}
            onChange={(e) =>
              setSort(
                e.target.value
              )
            }
          >
            <option value="">
              Sort By
            </option>

            <option value="title">
              Title A-Z
            </option>

            <option value="author">
              Author A-Z
            </option>

            <option value="rating">
              Highest Rating
            </option>

            <option value="pages">
              Most Pages
            </option>
          </select>

        </div>

        {filteredBooks.length === 0 ? (

          <div className="empty-state">

            <h2>
              No books found 📚
            </h2>

            <p>
              Try changing
              your filters.
            </p>

          </div>

        ) : (

          <div className="books-grid">

            {filteredBooks.map(
              (book) => (

                <BookCard
                  key={book._id}
                  book={book}
                  onDelete={
                    handleDelete
                  }
                />

              )
            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default MyBooks;