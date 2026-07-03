import { useState } from "react";
import "./NotesSection.css";

function NotesSection({
  notes = [],
  onAddNote,
  onDeleteNote,
}) {

  const [page, setPage] = useState("");
  const [content, setContent] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!page || !content.trim())
      return;

    const newNote = {
      page: Number(page),
      content: content.trim(),
      createdAt: new Date(),
    };

    onAddNote(newNote);

    setPage("");
    setContent("");
  };

  const sortedNotes = [...notes].sort(
    (a, b) => a.page - b.page
  );

  return (
    <section className="notes-section">

      <div className="notes-header">

        <div>

          <h2>
            📝 Reading Notes
          </h2>

          <p>
            Save quotes, ideas and
            important moments while
            reading.
          </p>

        </div>

        <span className="notes-count">
          {notes.length} Notes
        </span>

      </div>

      <form
        className="note-form"
        onSubmit={handleSubmit}
      >

        <input
          type="number"
          min="1"
          placeholder="Page Number"
          value={page}
          onChange={(e) =>
            setPage(e.target.value)
          }
          required
        />

        <textarea
          rows="4"
          maxLength="500"
          placeholder="Write your note..."
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
          required
        />

        <small className="character-count">
          {content.length}/500
        </small>

        <button type="submit">
          ➕ Add Note
        </button>

      </form>

      {sortedNotes.length === 0 ? (

        <div className="empty-notes">

          <h3>
            No Notes Yet
          </h3>

          <p>
            Start adding notes while
            reading this book.
          </p>

        </div>

      ) : (

        <div className="notes-grid">

          {sortedNotes.map(
            (note, index) => (

              <div
                key={index}
                className="note-card"
              >

                <div className="note-top">

                  <span className="page-badge">
                    📖 Page {note.page}
                  </span>

                  {onDeleteNote && (

                    <button
                      className="delete-btn"
                      onClick={() =>
                        onDeleteNote(index)
                      }
                      title="Delete Note"
                    >
                      ✕
                    </button>

                  )}

                </div>

                <p className="note-content">
                  {note.content}
                </p>

                <small>
                  {note.createdAt &&
                    new Date(
                      note.createdAt
                    ).toLocaleDateString()}
                </small>

              </div>

            )
          )}

        </div>

      )}

    </section>
  );
}

export default NotesSection;