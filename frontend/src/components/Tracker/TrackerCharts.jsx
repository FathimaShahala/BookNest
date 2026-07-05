import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

import "./TrackerCharts.css";

function TrackerCharts({ sessions }) {
  /* ===========================
      Line Chart Data
  =========================== */

  const chartData = sessions
    .map((session) => ({
      date: new Date(session.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
      }),

      pages: session.pagesRead || 0,

      minutes: session.minutesRead || 0,
    }))
    .reverse();

  /* ===========================
      Genre Data
  =========================== */

  const genreMap = {};

  sessions.forEach((session) => {
    const genre = session.book?.genre || "Unknown";

    if (!genreMap[genre]) {
      genreMap[genre] = 0;
    }

    genreMap[genre]++;
  });

  const genreData = Object.keys(genreMap).map((genre) => ({
    name: genre,
    value: genreMap[genre],
  }));

  /* ===========================
      Monthly Data
  =========================== */

  const monthMap = {};

  sessions.forEach((session) => {
    const month = new Date(session.date).toLocaleString("default", {
      month: "short",
    });

    if (!monthMap[month]) {
      monthMap[month] = 0;
    }

    monthMap[month] += session.pagesRead || 0;
  });

  const monthlyData = Object.keys(monthMap).map((month) => ({
    month,
    pages: monthMap[month],
  }));

  /* ===========================
      Pie Colors
  =========================== */

  const COLORS = [
    "#4f46e5",
    "#10b981",
    "#f59e0b",
    "#ef4444",
    "#06b6d4",
    "#8b5cf6",
    "#14b8a6",
    "#ec4899",
    "#84cc16",
    "#f97316",
  ];

  return (
    <div className="tracker-charts">
      {/* =======================
            Pages Chart
      ======================= */}

      <div className="tracker-chart-card">
        <h2>📖 Pages Read</h2>

        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="pages"
              stroke="#4f46e5"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* =======================
            Reading Time
      ======================= */}

      <div className="tracker-chart-card">
        <h2>⏱ Reading Time</h2>

        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="minutes"
              fill="#10b981"
              radius={[8, 8, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* =======================
            Genre Pie Chart
      ======================= */}

      <div className="tracker-chart-card tracker-chart-full">
        <h2>📚 Genre Distribution</h2>

        {genreData.length > 0 ? (
          <ResponsiveContainer width="100%" height={380}>
            <PieChart>
              <Pie
                data={genreData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {genreData.map((entry, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-chart">
            No genre data available.
          </div>
        )}
      </div>

      {/* =======================
            Monthly Overview
      ======================= */}

      <div className="tracker-chart-card tracker-chart-full">
        <h2>📅 Monthly Reading Overview</h2>

        {monthlyData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="pages"
                fill="#4f46e5"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="empty-chart">
            No monthly data available.
          </div>
        )}
      </div>
    </div>
  );
}

export default TrackerCharts;