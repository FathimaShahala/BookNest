import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  getBookById,
  updateBook,
} from "../../services/bookService";

import ProgressTracker from "../../components/ProgressTracker/ProgressTracker";
import NotesSection from "../../components/NotesSection/NotesSection";

import "./BookDetails.css";

function BookDetails() {
  const { id } = useParams();

  const { user } = useAuth();

  const [book, setBook] = useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadBook();
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

  const addNote = async (note) => {
    try {
      const updatedBook = {
        ...book,
        notes: [
          ...(book.notes || []),
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

  const deleteNote = async (
    index
  ) => {
    try {
      const updatedNotes =
        book.notes.filter(
          (_, i) =>
            i !== index
        );

      const updatedBook = {
        ...book,
        notes: updatedNotes,
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
              src={
                book.coverImage
              }
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
          <h1>{book.title}</h1>

          <h3>
            by {book.author}
          </h3>

          <p className="genre">
            {book.genre}
          </p>

          <span className="status-badge">
            {
              book.readingStatus
            }
          </span>

          <div className="description">
            <h4>
              Description
            </h4>

            <p>
              {book.description ||
                "No description available."}
            </p>
          </div>

          <div className="book-stats">
            <div>
              <strong>
                Total Pages:
              </strong>{" "}
              {book.totalPages}
            </div>

            <div>
              <strong>
                Current Page:
              </strong>{" "}
              {book.currentPage}
            </div>

            <div>
              <strong>
                Rating:
              </strong>{" "}
              {book.rating ||
                0}
              /5
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