import { Link } from "react-router-dom";
import "./BookCard.css";

function BookCard({
  book,
  onDelete
}) {
  const progress = Math.round(
    (book.currentPage /
      book.totalPages) * 100
  );

  return (
    <div className="book-card">

      <img
        src={
          book.coverImage ||
          "https://via.placeholder.com/250x350?text=Book"
        }
        alt={book.title}
      />

      <div className="book-info">

        <h3>{book.title}</h3>

        <p>{book.author}</p>

        <span>{book.genre}</span>

        <p className="status">
          {book.readingStatus}
        </p>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`
            }}
          />
        </div>

        <small>
          {progress}% Complete
        </small>

        <div className="actions">

          <Link
            to={`/books/${book._id}`}
            className="view-btn"
          >
            View
          </Link>

          <Link
            to={`/edit-book/${book._id}`}
            className="edit-btn"
          >
            Edit
          </Link>

          <button
            className="delete-btn"
            onClick={() =>
              onDelete(book._id)
            }
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
}

export default BookCard;