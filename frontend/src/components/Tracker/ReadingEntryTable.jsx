import { FaEdit, FaTrash, FaFilter, FaCalendarAlt } from "react-icons/fa";

import "./ReadingEntryTable.css";

function ReadingEntryTable() {
  const entries = [
    {
      id: 1,
      date: "May 18, 2025",
      cover: "https://covers.openlibrary.org/b/id/10521270-L.jpg",
      title: "Atomic Habits",
      author: "James Clear",
      pagesRead: 32,
      totalPages: 320,
      time: "45m",
      notes: "Great insights on habit building!",
    },

    {
      id: 2,
      date: "May 17, 2025",
      cover: "https://covers.openlibrary.org/b/id/8226191-L.jpg",
      title: "The Alchemist",
      author: "Paulo Coelho",
      pagesRead: 25,
      totalPages: 208,
      time: "30m",
      notes: "The journey is the destination.",
    },

    {
      id: 3,
      date: "May 16, 2025",
      cover: "https://covers.openlibrary.org/b/id/11153227-L.jpg",
      title: "Deep Work",
      author: "Cal Newport",
      pagesRead: 40,
      totalPages: 296,
      time: "50m",
      notes: "Focus is a superpower.",
    },

    {
      id: 4,
      date: "May 15, 2025",
      cover: "https://covers.openlibrary.org/b/id/10452538-L.jpg",
      title: "Ikigai",
      author: "Héctor García",
      pagesRead: 20,
      totalPages: 176,
      time: "25m",
      notes: "Beautiful book on purpose.",
    },

    {
      id: 5,
      date: "May 14, 2025",
      cover: "https://covers.openlibrary.org/b/id/10594765-L.jpg",
      title: "The 5 AM Club",
      author: "Robin Sharma",
      pagesRead: 30,
      totalPages: 256,
      time: "35m",
      notes: "Own your morning.",
    },
  ];

  return (
    <div className="tracker-table-card">
      <div className="tracker-table-header">
        <h2>Reading Entries</h2>

        <div className="tracker-table-actions">
          <button>
            <FaCalendarAlt />
            May 2025
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

              <th>Notes</th>

              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {entries.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.date}</td>

                <td>
                  <div className="book-cell">
                    <img src={entry.cover} alt={entry.title} />

                    <div>
                      <h4>{entry.title}</h4>

                      <p>{entry.author}</p>
                    </div>
                  </div>
                </td>

                <td>{entry.pagesRead}</td>

                <td>{entry.totalPages}</td>

                <td>{entry.time}</td>

                <td>{entry.notes}</td>

                <td>
                  <div className="table-actions">
                    <button className="edit-btn">
                      <FaEdit />
                    </button>

                    <button className="delete-btn">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="tracker-pagination">
        <p>Showing 1 to 5 of 28 entries</p>

        <div>
          <button>{"<"}</button>

          <button className="active">1</button>

          <button>2</button>

          <button>3</button>

          <button>{">"}</button>
        </div>
      </div>
    </div>
  );
}

export default ReadingEntryTable;
