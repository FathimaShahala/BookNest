import {
  FaBookOpen,
  FaFileAlt,
  FaClock,
  FaBullseye,
} from "react-icons/fa";

import "./TrackerStats.css";

function TrackerStats({ stats }) {
  return (
    <div className="tracker-stats">

      <div className="tracker-stat-card">

        <div className="tracker-stat-icon purple">
          <FaBookOpen />
        </div>

        <div>

          <span>Total Entries</span>

          <h2>{stats.totalEntries}</h2>

          <p>This Month</p>

        </div>

      </div>

      <div className="tracker-stat-card">

        <div className="tracker-stat-icon green">
          <FaFileAlt />
        </div>

        <div>

          <span>Total Pages Read</span>

          <h2>{stats.totalPages}</h2>

          <p>This Month</p>

        </div>

      </div>

      <div className="tracker-stat-card">

        <div className="tracker-stat-icon orange">
          <FaClock />
        </div>

        <div>

          <span>Total Reading Time</span>

          <h2>
            {Math.floor(stats.totalMinutes / 60)}h{" "}
            {stats.totalMinutes % 60}m
          </h2>

          <p>This Month</p>

        </div>

      </div>

      <div className="tracker-stat-card">

        <div className="tracker-stat-icon blue">
          <FaBullseye />
        </div>

        <div>

          <span>Daily Average</span>

          <h2>{stats.dailyAverage}</h2>

          <p>Pages / Day</p>

        </div>

      </div>

    </div>
  );
}

export default TrackerStats;