import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { getBooks } from "../../services/bookService";
import { useAuth } from "../../context/AuthContext";
import { addReadingSession } from "../../services/trackerService";
import { updateReadingSession } from "../../services/trackerService";

import toast from "react-hot-toast";
import "./AddReadingEntryModal.css";
function AddReadingEntryModal({
  open,
  onClose,
  onSave,
  editingSession = null,
}) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    book: "",
    date: "",
    startPage: "",
    endPage: "",
    minutesRead: "",
    mood: "😊",
    notes: "",
  });
  const [books, setBooks] = useState([]);
  const [searchBook, setSearchBook] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (open && user) {
      loadBooks();
    }
  }, [open, user]);
  const loadBooks = async () => {
    try {
      const data = await getBooks(user.token);
      setBooks(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (editingSession) {
      setForm({
        book: editingSession.book?._id || editingSession.book || "",
        date: editingSession.date?.split("T")[0] || "",
        startPage: editingSession.startPage || "",
        endPage: editingSession.endPage || "",
        minutesRead: editingSession.minutesRead || "",
        mood: editingSession.mood || "😊",
        notes: editingSession.notes || "",
      });

      setSearchBook(editingSession.book?.title || "");
    } else {
      setForm({
        book: "",
        date: "",
        startPage: "",
        endPage: "",
        minutesRead: "",
        mood: "😊",
        notes: "",
      });

      setSearchBook("");
    }
  }, [editingSession]);

  if (!open) return null;
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
  console.log("Submitting form:", form);
    if (!form.book) {
      toast.error("Please select a book.");
      return;
    }

    if (Number(form.endPage) < Number(form.startPage)) {
      toast.error("End page must be greater than Start page.");
      return;
    }

    setLoading(true);

    try {
      if (editingSession) {
        await updateReadingSession(editingSession._id, form, user.token);

        toast.success("Reading entry updated!");
      } else {
        await addReadingSession(form, user.token);

        toast.success("Reading entry added!");
      }

      onSave?.();
      setForm({
        book: "",
        date: "",
        startPage: "",
        endPage: "",
        minutesRead: "",
        mood: "😊",
        notes: "",
      });

      setSearchBook("");
      onClose();
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchBook.toLowerCase()),
  );
  return (
    <div className="tracker-modal-overlay" onClick={onClose}>
      <div className="tracker-modal" onClick={(e) => e.stopPropagation()}>
        <div className="tracker-modal-header">
          <h2>
            {editingSession ? "✏ Edit Reading Entry" : "📚 Add Reading Entry"}
          </h2>
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
                    {filteredBooks.length > 0 ? (
                      filteredBooks.map((book) => (
                        <div
                          key={book._id}
                          className="book-option"
                          onMouseDown={() => {
                            setForm((prev) => ({
                              ...prev,
                              book: book._id,
                            }));

                            setSearchBook(book.title);

                            setShowDropdown(false);
                          }}
                        >
                          <strong>{book.title}</strong>

                          <small>{book.author}</small>
                        </div>
                      ))
                    ) : (
                      <div className="no-books">No books found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                max={new Date().toISOString().split("T")[0]}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Start Page</label>
              <input
                type="number"
                name="startPage"
                value={form.startPage}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>End Page</label>
              <input
                type="number"
                name="endPage"
                value={form.endPage}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Reading Time (Minutes)</label>
              <input
                type="number"
                name="minutesRead"
                min="1"
                value={form.minutesRead}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Mood</label>
              <select name="mood" value={form.mood} onChange={handleChange}>
                <option value="😊">😊 Happy</option>
                <option value="😍">😍 Loved It</option>
                <option value="😴">😴 Sleepy</option>
                <option value="🤩">🤩 Amazing</option>
                <option value="😌">😌 Relaxed</option>
              </select>
            </div>
          </div>
          <label>Notes</label>
          <textarea
            rows="4"
            name="notes"
            placeholder="Write your thoughts..."
            value={form.notes}
            onChange={handleChange}
          />
          <div className="tracker-modal-footer">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="save-btn" disabled={loading}>
              {loading
                ? "Saving..."
                : editingSession
                  ? "Update Entry"
                  : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddReadingEntryModal;
