import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import TrackerHeader from "../../components/Tracker/TrackerHeader";
import TrackerStats from "../../components/Tracker/TrackerStats";
import ReadingEntryTable from "../../components/Tracker/ReadingEntryTable";
// import ReadingHeatmap from "../../components/ReadingHeatmap/ReadingHeatmap";
import AddReadingEntryModal from "../../components/Tracker/AddReadingEntryModal";
import { getReadingSessions } from "../../services/trackerService";
import TrackerCharts from "../../components/Tracker/TrackerCharts";

import "./Tracker.css";

function Tracker() {
  const [sessions, setSessions] = useState([]);

  const [stats, setStats] = useState({
    totalEntries: 0,
    totalPages: 0,
    totalMinutes: 0,
    dailyAverage: 0,
  });

  const [openModal, setOpenModal] = useState(false);
  const [editingSession, setEditingSession] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    loadTracker();
  }, []);

  const loadTracker = async () => {
    try {
      const data = await getReadingSessions(user.token);

      setSessions(data);

      const totalEntries = data.length;

      const totalPages = data.reduce(
        (sum, item) => sum + item.pagesRead,

        0,
      );

      const totalMinutes = data.reduce(
        (sum, item) => sum + item.minutesRead,

        0,
      );

      const dailyAverage =
        totalEntries === 0 ? 0 : Math.round(totalPages / totalEntries);

      setStats({
        totalEntries,

        totalPages,

        totalMinutes,

        dailyAverage,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const years = [
    ...new Set(sessions.map((session) => new Date(session.date).getFullYear())),
  ].sort((a, b) => b - a);

  const filteredSessions = sessions
    .filter((session) => {
      const title = session.book?.title?.toLowerCase() || "";

      const author = session.book?.author?.toLowerCase() || "";

      const notes = session.notes?.toLowerCase() || "";

      const sessionDate = new Date(session.date);

      const month = sessionDate.getMonth() + 1;

      const year = sessionDate.getFullYear();

      const matchesSearch =
        title.includes(search.toLowerCase()) ||
        author.includes(search.toLowerCase()) ||
        notes.includes(search.toLowerCase());

      const matchesMonth =
        selectedMonth === "" || month === Number(selectedMonth);

      const matchesYear = selectedYear === "" || year === Number(selectedYear);

      return matchesSearch && matchesMonth && matchesYear;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "oldest":
          return new Date(a.date) - new Date(b.date);

        case "pages":
          return b.pagesRead - a.pagesRead;

        case "minutes":
          return b.minutesRead - a.minutesRead;

        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

  const summary = (() => {
    const uniqueBooks = new Set(
      filteredSessions.map((session) => session.book?._id),
    );

    const totalBooks = uniqueBooks.size;

    const totalPages = filteredSessions.reduce(
      (sum, session) => sum + (session.pagesRead || 0),
      0,
    );

    const totalMinutes = filteredSessions.reduce(
      (sum, session) => sum + (session.minutesRead || 0),
      0,
    );

    const averagePages = filteredSessions.length
      ? Math.round(totalPages / filteredSessions.length)
      : 0;

    const averageMinutes = filteredSessions.length
      ? Math.round(totalMinutes / filteredSessions.length)
      : 0;

    const longestSession = filteredSessions.reduce(
      (max, session) => Math.max(max, session.pagesRead || 0),
      0,
    );

    const today = new Date();

    const thisMonthPages = filteredSessions
      .filter((session) => {
        const d = new Date(session.date);

        return (
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      })
      .reduce((sum, session) => sum + (session.pagesRead || 0), 0);

    // ---------- Reading Streak ----------

    const dates = [
      ...new Set(
        filteredSessions.map(
          (session) => new Date(session.date).toISOString().split("T")[0],
        ),
      ),
    ]
      .sort()
      .reverse();

    let streak = 0;

    let current = new Date();

    for (const d of dates) {
      const currentDate = current.toISOString().split("T")[0];

      if (d === currentDate) {
        streak++;

        current.setDate(current.getDate() - 1);
      } else {
        break;
      }
    }

    return {
      totalBooks,

      totalPages,

      totalMinutes,

      averagePages,

      averageMinutes,

      longestSession,

      thisMonthPages,

      streak,
    };
  })();

  return (
    <DashboardLayout>
      <div className="tracker-page">
        <TrackerHeader onAdd={() => setOpenModal(true)} />
        <TrackerStats stats={stats} />
        <div className="tracker-search">
          <input
            type="text"
            placeholder="🔍 Search by book, author or notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="tracker-filters">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>

              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month, index) => (
                <option key={month} value={index + 1}>
                  {month}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">All Years</option>

              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="newest">Newest First</option>

              <option value="oldest">Oldest First</option>

              <option value="pages">Most Pages</option>

              <option value="minutes">Most Reading Time</option>
            </select>
          </div>
        </div>
        <div className="summary-grid">
          <div className="summary-card">
            <span>📚</span>
            <h3>{summary.totalBooks}</h3>
            <p>Books Read</p>
          </div>

          <div className="summary-card">
            <span>📄</span>
            <h3>{summary.totalPages}</h3>
            <p>Pages Read</p>
          </div>

          <div className="summary-card">
            <span>⏱</span>
            <h3>{summary.totalMinutes}</h3>
            <p>Minutes Read</p>
          </div>

          <div className="summary-card">
            <span>⭐</span>
            <h3>{summary.averagePages}</h3>
            <p>Avg Pages</p>
          </div>

          <div className="summary-card">
            <span>🔥</span>
            <h3>{summary.streak}</h3>
            <p>Day Streak</p>
          </div>

          <div className="summary-card">
            <span>🏆</span>
            <h3>{summary.longestSession}</h3>
            <p>Longest Session</p>
          </div>

          <div className="summary-card">
            <span>📅</span>
            <h3>{summary.thisMonthPages}</h3>
            <p>This Month</p>
          </div>

          <div className="summary-card">
            <span>⌛</span>
            <h3>{summary.averageMinutes}</h3>
            <p>Avg Minutes</p>
          </div>
        </div>
        <ReadingEntryTable
          sessions={filteredSessions}
          onRefresh={loadTracker}
          onEdit={(session) => {
            setEditingSession(session);

            setOpenModal(true);
          }}
        />{" "}
        <TrackerCharts
    sessions={filteredSessions}
/>
      </div>

      <AddReadingEntryModal
        open={openModal}
        editingSession={editingSession}
        onClose={() => {
          setOpenModal(false);

          setEditingSession(null);
        }}
        onSave={loadTracker}
      />
    </DashboardLayout>
  );
}

export default Tracker;
