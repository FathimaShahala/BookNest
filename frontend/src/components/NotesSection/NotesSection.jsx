import { useState } from "react";
import "./NotesSection.css";

function NotesSection({
  notes = [],
  onAddNote,
  onDeleteNote,
}) {
  const [page, setPage] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!page || !content.trim()) {
      return;
    }

    const newNote = {
      page: Number(page),
      content,
      createdAt: new Date(),
    };

    onAddNote(newNote);

    setPage("");
    setContent("");
  };

  return (
    <div className="notes-section">

      <div className="notes-header">
        <h2>Reading Notes</h2>
        <p>
          Save important thoughts,
          quotes, and insights while reading.
        </p>
      </div>

      <form
        className="note-form"
        onSubmit={handleSubmit}
      >
        <input
          type="number"
          placeholder="Page Number"
          value={page}
          onChange={(e) =>
            setPage(e.target.value)
          }
        />

        <textarea
          rows="4"
          placeholder="Write your note..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />

        <button type="submit">
          Add Note
        </button>
      </form>

      {notes.length === 0 ? (
        <div className="empty-notes">
          <h3>No Notes Yet</h3>
          <p>
            Start adding notes while
            reading this book.
          </p>
        </div>
      ) : (
        <div className="notes-grid">
          {notes.map(
            (note, index) => (
              <div
                key={index}
                className="note-card"
              >
                <div className="note-top">
                  <span className="page-badge">
                    Page {note.page}
                  </span>

                  {onDeleteNote && (
                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDeleteNote(index)
                      }
                    >
                      ×
                    </button>
                  )}
                </div>

                <p className="note-content">
                  {note.content}
                </p>

                <small>
                  {note.createdAt
                    ? new Date(
                        note.createdAt
                      ).toLocaleDateString()
                    : ""}
                </small>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}

export default NotesSection;