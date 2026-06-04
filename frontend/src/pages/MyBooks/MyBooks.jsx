import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  getBooks,
  deleteBook
} from "../../services/bookService";

import BookCard from "../../components/BookCard/BookCard";
import StatsSection from "../../components/StatsSection/StatsSection";

import "./MyBooks.css";

function MyBooks() {

  const { user } = useAuth();

  const [books, setBooks] = useState([]);

  const [search, setSearch] =
    useState("");

  const [status, setStatus] =
    useState("");

  const [genre, setGenre] =
    useState("");

  const [sort, setSort] =
    useState("");

  useEffect(() => {

    const loadBooks =
      async () => {

        const data =
          await getBooks(
            user.token
          );

        setBooks(data);
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
        console.error(error);
      }
    };

  let filteredBooks =
    books.filter((book) => {

      const searchMatch =
        book.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const statusMatch =
        status === "" ||
        book.readingStatus ===
          status;

      const genreMatch =
        genre === "" ||
        book.genre === genre;

      return (
        searchMatch &&
        statusMatch &&
        genreMatch
      );
    });

  if (sort === "title") {
    filteredBooks.sort(
      (a, b) =>
        a.title.localeCompare(
          b.title
        )
    );
  }

  if (sort === "author") {
    filteredBooks.sort(
      (a, b) =>
        a.author.localeCompare(
          b.author
        )
    );
  }

  return (
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

      <StatsSection books={books} />

      <div className="filters">

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(
              e.target.value
            )
          }
        >
          <option value="">
            All Status
          </option>

          <option value="Want To Read">
            Want To Read
          </option>

          <option value="Currently Reading">
            Currently Reading
          </option>

          <option value="Next To Read">
            Next To Read
          </option>

          <option value="Completed">
            Completed
          </option>
        </select>

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

          <option value="Fiction">
            Fiction
          </option>

          <option value="Self Help">
            Self Help
          </option>

          <option value="Biography">
            Biography
          </option>

          <option value="Productivity">
            Productivity
          </option>
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
            Title
          </option>

          <option value="author">
            Author
          </option>
        </select>

      </div>

      {filteredBooks.length === 0 ? (

        <div className="empty-state">

          <h2>
            No books found 📚
          </h2>

          <p>
            Start adding books
            to your shelf.
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
  );
}

export default MyBooks;