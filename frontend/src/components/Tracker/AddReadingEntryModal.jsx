import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { getBooks } from "../../services/bookService";

import { useAuth } from "../../context/AuthContext";
import {
  addReadingSession,
} from "../../services/trackerService";

import "./AddReadingEntryModal.css";

function AddReadingEntryModal({ open, onClose, onSave }) {
  const { user } = useAuth();

  const [books, setBooks] = useState([]);
  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getBooks(user.token);

      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const [form, setForm] = useState({
    book: "",

    date: "",

    startPage: "",

    endPage: "",

    minutesRead: "",

    mood: "😊",

    notes: "",
  });

  if (!open) return null;

  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit =
  async (e) => {

    e.preventDefault();

    try {

      await addReadingSession(

        form,

        user.token

      );

      if (onSave) {

        onSave();

      }

      onClose();

    }

    catch (error) {

      console.log(error);

    }

  };

  const [searchBook, setSearchBook] = useState("");

  const [showDropdown, setShowDropdown] = useState(false);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchBook.toLowerCase()),
  );

  return (
    <div className="tracker-modal-overlay">
      <div className="tracker-modal">
        <div className="tracker-modal-header">
          <h2>📚 Add Reading Entry</h2>

          <button onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="tracker-form-grid">
            <div>
              <label>Book</label>
              <div className="book-search">
                <input
                  type="text"
                  placeholder="Search for a book..."
                  value={searchBook}
                  onChange={(e) => setSearchBook(e.target.value)}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                />
                {showDropdown && (
                  <div className="book-dropdown">
                    {filteredBooks.map((book) => (
                      <div
                        key={book._id}
                        className="book-option"
                        onClick={() => {
                          setForm({ ...form, book: book._id });
                          setSearchBook(book.title);
                          setShowDropdown(false);
                        }}
                      >
                        {book.title}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label>Date</label>

              <input type="date" name="date" onChange={handleChange} />
            </div>

            <div>
              <label>Start Page</label>

              <input type="number" name="startPage" onChange={handleChange} />
            </div>

            <div>
              <label>End Page</label>

              <input type="number" name="endPage" onChange={handleChange} />
            </div>

            <div>
              <label>Reading Time (Minutes)</label>

              <input type="number" name="minutesRead" onChange={handleChange} />
            </div>

            <div>
              <label>Mood</label>

              <select name="mood" onChange={handleChange}>
                <option>😊</option>
                <option>😍</option>
                <option>😴</option>
                <option>🤩</option>
                <option>😌</option>
              </select>
            </div>
          </div>

          <label>Notes</label>

          <textarea
            rows="4"
            name="notes"
            placeholder="Write your thoughts..."
            onChange={handleChange}
          />

          <div className="tracker-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save Entry
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReadingEntryModal;
