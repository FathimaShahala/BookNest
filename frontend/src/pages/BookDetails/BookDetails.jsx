import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaHeart,FaBookmark } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  getBookById,
  updateBook,
} from "../../services/bookService";

import {
  addFavorite,
  removeFavorite,
  getFavorites,
} from "../../services/favoriteService";

import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "../../services/wishlistService";

import ProgressTracker from "../../components/ProgressTracker/ProgressTracker";
import NotesSection from "../../components/NotesSection/NotesSection";

import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] =
    useState(false);
    const [isWishlist, setIsWishlist] =
  useState(false);

  useEffect(() => {
    loadBook();
    checkFavorite();
    checkWishlist();
  }, []);

  const loadBook = async () => {
    try {
      const data =
        await getBookById(
          id,
          user.token
        );

      setBook(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavorite =
    async () => {
      try {
        const favorites =
          await getFavorites(
            user.token
          );

        const exists =
          favorites.some(
            (fav) =>
              fav._id === id
          );

        setIsFavorite(exists);
      } catch (error) {
        console.error(error);
      }
    };

  const handleFavorite =
    async () => {
      try {
        if (isFavorite) {
          await removeFavorite(
            book._id,
            user.token
          );

          setIsFavorite(false);
        } else {
          await addFavorite(
            book._id,
            user.token
          );

          setIsFavorite(true);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const checkWishlist =
  async () => {
    try {
      const wishlist =
        await getWishlist(
          user.token
        );

      const exists =
        wishlist.some(
          (item) =>
            item._id === id
        );

      setIsWishlist(exists);
    } catch (error) {
      console.log(error);
    }
  };

  const handleWishlist =
  async () => {
    try {
      if (isWishlist) {
        await removeWishlist(
          book._id,
          user.token
        );

        setIsWishlist(false);
      } else {
        await addWishlist(
          book._id,
          user.token
        );

        setIsWishlist(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addNote = async (
    note
  ) => {
    try {
      const updatedBook = {
        ...book,
        notes: [
          ...(book.notes ||
            []),
          note,
        ],
      };

      await updateBook(
        id,
        updatedBook,
        user.token
      );

      setBook(updatedBook);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteNote =
    async (index) => {
      try {
        const updatedNotes =
          book.notes.filter(
            (_, i) =>
              i !== index
          );

        const updatedBook = {
          ...book,
          notes:
            updatedNotes,
        };

        await updateBook(
          id,
          updatedBook,
          user.token
        );

        setBook(updatedBook);
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <div className="book-details-loading">
        Loading...
      </div>
    );
  }

  if (!book) {
    return (
      <div className="book-details-loading">
        Book not found
      </div>
    );
  }

  return (
    <div className="book-details-page">

      <div className="book-details-card">

        <div className="book-cover-section">

          {book.coverImage ? (
            <img
              src={book.coverImage}
              alt={book.title}
              className="book-cover"
            />
          ) : (
            <div className="book-cover-placeholder">
              No Cover
            </div>
          )}

        </div>

        <div className="book-info-section">

          <div className="title-row">

            <h1>{book.title}</h1>

            <button
              className="favorite-icon-btn"
              onClick={
                handleFavorite
              }
            >
              <FaHeart
                className={
                  isFavorite
                    ? "favorite-active"
                    : "favorite-inactive"
                }
              />
            </button>
            <button
  className="wishlist-icon-btn"
  onClick={
    handleWishlist
  }
>
  <FaBookmark
    className={
      isWishlist
        ? "wishlist-active"
        : "wishlist-inactive"
    }
  />
</button>

          </div>

          <h3>
            by {book.author}
          </h3>

          <p className="genre">
            {book.genre}
          </p>

          <span className="status-badge">
            {book.readingStatus}
          </span>

          <div className="description">
            <h4>Description</h4>

            <p>
              {book.description}
            </p>
          </div>

          <div className="book-stats">

            <div>
              <strong>
                Total Pages
              </strong>
              <br />
              {
                book.totalPages
              }
            </div>

            <div>
              <strong>
                Current Page
              </strong>
              <br />
              {
                book.currentPage
              }
            </div>

            <div>
              <strong>
                Rating
              </strong>
              <br />
              {book.rating || 0}/5
            </div>

          </div>

          <ProgressTracker
            currentPage={
              book.currentPage
            }
            totalPages={
              book.totalPages
            }
          />

          <div className="book-actions">

            <Link
              to={`/edit-book/${book._id}`}
              className="edit-book-btn"
            >
              Edit Book
            </Link>

            <Link
              to={`/reviews/${book._id}`}
              className="reviews-btn"
            >
              Reviews
            </Link>

            

          </div>

        </div>

      </div>

      <NotesSection
        notes={
          book.notes || []
        }
        onAddNote={addNote}
        onDeleteNote={
          deleteNote
        }
      />

    </div>
  );
}

export default BookDetails;