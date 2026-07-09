import { FaEdit, FaTrash, FaFilter, FaCalendarAlt } from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import { deleteReadingSession } from "../../services/trackerService";

import "./ReadingEntryTable.css";

function ReadingEntryTable({ sessions, onRefresh, onEdit }) {
  const { user } = useAuth();

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this reading session?",
    );

    if (!confirmDelete) return;

    try {
      await deleteReadingSession(id, user.token);

      onRefresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="tracker-table-card">
      <div className="tracker-table-header">
        <h2>Reading Entries</h2>

        <div className="tracker-table-actions">
          <button>
            <FaCalendarAlt />
            This Month
          </button>

          <button>
            <FaFilter />
            Filter
          </button>
        </div>
      </div>

      <div className="tracker-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Book</th>
              <th>Pages Read</th>
              <th>Total Pages</th>
              <th>Reading Time</th>
              <th>Mood</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sessions.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty-table">
                  No reading sessions found.
                </td>
              </tr>
            ) : (
              sessions.map((entry) => (
                <tr key={entry._id}>
                  <td>{new Date(entry.date).toLocaleDateString()}</td>

                  <td>
                    <div className="book-cell">
                      <img
                        src={entry.book?.coverImage || "/book-placeholder.png"}
                        alt={entry.book?.title}
                      />

                      <div>
                        <h4>{entry.book?.title}</h4>

                        <p>{entry.book?.author}</p>
                      </div>
                    </div>
                  </td>

                  <td>{entry.pagesRead}</td>

                  <td>{entry.book?.totalPages}</td>

                  <td>{entry.minutesRead} min</td>

                  <td
                    style={{
                      fontSize: "20px",
                    }}
                  >
                    {entry.mood}
                  </td>

                  <td>{entry.notes || "-"}</td>

                  <td>
                    <div className="table-actions">
                      <button
                        className="edit-btn"
                        title="Edit"
                        onClick={() => onEdit(entry)}
                      >
                        <FaEdit />
                      </button>

                      <button
                        className="delete-btn"
                        title="Delete"
                        onClick={() => handleDelete(entry._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="tracker-pagination">
        <p>
          Total Sessions : <strong>{sessions.length}</strong>
        </p>

        <div>
          <button>{"<"}</button>

          <button className="active">1</button>

          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default ReadingEntryTable;
