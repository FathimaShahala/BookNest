import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import {
  getBooks,
} from "../../services/bookService";

import {
  getReadingSessions,
  getTrackerSummary,
  addReadingSession,
  deleteReadingSession,
} from "../../services/readingTrackerService";

import "./ReadingTracker.css";

function ReadingTracker() {

  const { user } =
    useAuth();

  const [books, setBooks] =
    useState([]);

  const [sessions, setSessions] =
    useState([]);

  const [summary, setSummary] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({

      bookId: "",

      date:
        new Date()
          .toISOString()
          .split("T")[0],

      startPage: "",

      endPage: "",

      readingTime: "",

      mood: "😊",

      notes: "",

    });

  useEffect(() => {

    loadBooks();

    loadSessions();

    loadSummary();

  }, []);

  // =====================
  // Load Books
  // =====================

  const loadBooks =
    async () => {

      try {

        const data =
          await getBooks(
            user.token
          );

        setBooks(data);

      } catch (error) {

        console.log(error);

      }

    };

  // =====================
  // Load Sessions
  // =====================

  const loadSessions =
    async () => {

      try {

        const data =
          await getReadingSessions(
            user.token
          );

        setSessions(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }

    };

  // =====================
  // Load Summary
  // =====================

  const loadSummary =
    async () => {

      try {

        const data =
          await getTrackerSummary(
            user.token
          );

        setSummary(data);

      } catch (error) {

        console.log(error);

      }

    };

  // =====================
  // Handle Input
  // =====================

  const handleChange =
    (e) => {

      setFormData({

        ...formData,

        [e.target.name]:
          e.target.value,

      });

    };

  // =====================
  // Add Session
  // =====================

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await addReadingSession(

          formData,

          user.token

        );

        setFormData({

          bookId: "",

          date:
            new Date()
              .toISOString()
              .split("T")[0],

          startPage: "",

          endPage: "",

          readingTime: "",

          mood: "😊",

          notes: "",

        });

        loadSessions();

        loadSummary();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <DashboardLayout>

      <div className="tracker-page">

        <h1>
          📖 Reading Tracker
        </h1>

        {/* ========================= */}
        {/* Summary Cards */}
        {/* ========================= */}

        {summary && (

          <div className="tracker-summary">

            <div className="summary-card">

              <h3>
                📚 Sessions
              </h3>

              <h2>
                {summary.totalSessions}
              </h2>

            </div>

            <div className="summary-card">

              <h3>
                📄 Pages Read
              </h3>

              <h2>
                {summary.totalPages}
              </h2>

            </div>

            <div className="summary-card">

              <h3>
                ⏱ Reading Time
              </h3>

              <h2>

                {summary.totalTime}

                {" "}min

              </h2>

            </div>

            <div className="summary-card">

              <h3>
                🔥 Today
              </h3>

              <h2>

                {summary.todayPages}

                {" "}pages

              </h2>

            </div>

          </div>

        )}

        {/* ========================= */}
        {/* Form */}
        {/* ========================= */}

        <form

          className="tracker-form"

          onSubmit={handleSubmit}

        >

          <h2>

            Add Reading Session

          </h2>

          <select

            name="bookId"

            value={formData.bookId}

            onChange={handleChange}

            required

          >

            <option value="">

              Select Book

            </option>

            {books.map((book) => (

              <option

                key={book._id}

                value={book._id}

              >

                {book.title}

              </option>

            ))}

          </select>

          <input

            type="date"

            name="date"

            value={formData.date}

            onChange={handleChange}

          />

          <div className="page-inputs">

            <input

              type="number"

              name="startPage"

              placeholder="Start Page"

              value={formData.startPage}

              onChange={handleChange}

              required

            />

            <input

              type="number"

              name="endPage"

              placeholder="End Page"

              value={formData.endPage}

              onChange={handleChange}

              required

            />

          </div>

          <input

            type="number"

            name="readingTime"

            placeholder="Reading Time (minutes)"

            value={formData.readingTime}

            onChange={handleChange}

          />

          <select

            name="mood"

            value={formData.mood}

            onChange={handleChange}

          >

            <option value="😊">

              😊 Happy

            </option>

            <option value="😌">

              😌 Relaxed

            </option>

            <option value="🤩">

              🤩 Excited

            </option>

            <option value="😴">

              😴 Sleepy

            </option>

            <option value="😐">

              😐 Neutral

            </option>

          </select>

          <textarea

            rows="4"

            name="notes"

            placeholder="Session Notes..."

            value={formData.notes}

            onChange={handleChange}

          />

          <button type="submit">

            Save Session

          </button>

        </form>

                {/* ========================= */}
        {/* Reading Timeline */}
        {/* ========================= */}

        <div className="tracker-history">

          <h2>
            📅 Reading History
          </h2>

          {loading ? (

            <div className="tracker-loading">
              Loading...
            </div>

          ) : sessions.length === 0 ? (

            <div className="tracker-empty">

              <h3>
                No Reading Sessions Yet
              </h3>

              <p>
                Start tracking your reading
                today!
              </p>

            </div>

          ) : (

            <div className="timeline">

              {sessions.map((session) => (

                <div
                  key={session._id}
                  className="timeline-card"
                >

                  <div className="timeline-left">

                    {session.bookId?.coverImage ? (

                      <img
                        src={
                          session.bookId.coverImage
                        }
                        alt={
                          session.bookId.title
                        }
                      />

                    ) : (

                      <div className="timeline-placeholder">

                        📖

                      </div>

                    )}

                  </div>

                  <div className="timeline-center">

                    <h3>

                      {
                        session.bookId?.title
                      }

                    </h3>

                    <p>

                      {
                        session.bookId?.author
                      }

                    </p>

                    <span className="timeline-date">

                      {new Date(
                        session.date
                      ).toLocaleDateString()}

                    </span>

                    <div className="timeline-info">

                      <span>

                        📄

                        {session.startPage}

                        -

                        {session.endPage}

                      </span>

                      <span>

                        🔥

                        {session.pagesRead}

                        pages

                      </span>

                      <span>

                        ⏱

                        {session.readingTime}

                        min

                      </span>

                    </div>

                    <div className="timeline-mood">

                      Mood:

                      {" "}

                      {session.mood}

                    </div>

                    {session.notes && (

                      <div className="timeline-notes">

                        {session.notes}

                      </div>

                    )}

                  </div>

                  <div className="timeline-right">

                    <button

                      className="delete-session-btn"

                      onClick={async () => {

                        if (
                          window.confirm(
                            "Delete this reading session?"
                          )
                        ) {

                          try {

                            const {
                              deleteReadingSession,
                            } =

                            await deleteReadingSession(

                              session._id,

                              user.token

                            );

                            loadSessions();

                            loadSummary();

                          } catch (error) {

                            console.log(error);

                          }

                        }

                      }}

                    >

                      🗑

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </DashboardLayout>

  );

}

export default ReadingTracker;