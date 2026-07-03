import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getStatistics,
} from "../../services/statsService";

import { useAuth } from "../../context/AuthContext";

import {
  FaBook,
  FaCheckCircle,
  FaBookOpen,
  FaStar,
  FaFileAlt,
  FaTags,
} from "react-icons/fa";

import "./Statistics.css";

function Statistics() {

  const { user } = useAuth();

  const [stats, setStats] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats =
    async () => {
      try {

        const data =
          await getStatistics(
            user.token
          );

        setStats(data);

      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {

    return (
      <DashboardLayout>

        <div className="stats-loading">
          Loading Statistics...
        </div>

      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="stats-page">

        <div className="stats-header">

          <h1>
            📊 Reading Statistics
          </h1>

          <p>
            Track your reading journey
            and discover your habits.
          </p>

        </div>

        <div className="stats-grid">

          <div className="stat-card">

            <div className="stat-icon">
              <FaBook />
            </div>

            <h3>Total Books</h3>

            <h2>
              {stats.totalBooks}
            </h2>

          </div>

          <div className="stat-card">

            <div className="stat-icon success">
              <FaCheckCircle />
            </div>

            <h3>Completed</h3>

            <h2>
              {stats.completedBooks}
            </h2>

          </div>

          <div className="stat-card">

            <div className="stat-icon info">
              <FaBookOpen />
            </div>

            <h3>Currently Reading</h3>

            <h2>
              {stats.currentlyReading}
            </h2>

          </div>

          <div className="stat-card">

            <div className="stat-icon warning">
              <FaStar />
            </div>

            <h3>Average Rating</h3>

            <h2>
              ⭐ {stats.averageRating || 0}
            </h2>

          </div>

          <div className="stat-card">

            <div className="stat-icon purple">
              <FaFileAlt />
            </div>

            <h3>Pages Read</h3>

            <h2>
              {stats.totalPagesRead}
            </h2>

          </div>

          <div className="stat-card">

            <div className="stat-icon pink">
              <FaTags />
            </div>

            <h3>Favorite Genre</h3>

            <h2>
              {stats.favoriteGenre || "N/A"}
            </h2>

          </div>

        </div>

      </div>

    </DashboardLayout>

  );

}

export default Statistics;