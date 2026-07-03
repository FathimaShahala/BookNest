import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { useAuth } from "../../context/AuthContext";

import {
  getFavorites,
} from "../../services/favoriteService";

import {
  updateBook,
} from "../../services/bookService";

import "./Favorites.css";

function Favorites() {
  const { user } = useAuth();

  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites =
    async () => {
      try {
        const data =
          await getFavorites(
            user.token
          );

        setBooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const removeFavorite =
    async (id) => {
      try {

        const selectedBook =
          books.find(
            (book) =>
              book._id === id
          );

        if (!selectedBook)
          return;

        await updateBook(
          id,
          {
            ...selectedBook,
            isFavorite: false,
          },
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

  if (loading) {
    return (
      <DashboardLayout>
        <div className="favorites-loading">
          Loading Favorites...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="favorites-page">

        <h1>
          ❤️ Favorite Books
        </h1>

        {books.length === 0 ? (

          <div className="empty-favorites">

            <div className="empty-icon">
              ❤️
            </div>

            <h2>
              No Favorite Books
            </h2>

            <p>
              Books you mark as favorites
              will appear here.
            </p>

            <Link
              to="/books"
              className="browse-books-btn"
            >
              Browse Books
            </Link>

          </div>

        ) : (

          <div className="favorites-grid">

            {books.map(
              (book) => (

                <div
                  key={book._id}
                  className="favorite-card"
                >

                  <div className="favorite-image">

                    <img
                      src={
                        book.coverImage ||
                        "https://placehold.co/300x450?text=Book"
                      }
                      alt={book.title}
                    />

                    <button
                      className="remove-favorite-btn"
                      onClick={() =>
                        removeFavorite(
                          book._id
                        )
                      }
                      title="Remove from Favorites"
                    >
                      ❤️
                    </button>

                  </div>

                  <div className="favorite-content">

                    <span className="genre-badge">
                      {book.genre || "General"}
                    </span>

                    <h3>
                      {book.title}
                    </h3>

                    <p className="author">
                      {book.author}
                    </p>

                    <div className="favorite-meta">

                      <span className="status">
                        {book.readingStatus}
                      </span>

                      <span className="rating">
                        ⭐ {book.rating || 0}/5
                      </span>

                    </div>

                    <Link
                      to={`/books/${book._id}`}
                      className="details-btn"
                    >
                      View Details
                    </Link>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </DashboardLayout>
  );
}

export default Favorites;