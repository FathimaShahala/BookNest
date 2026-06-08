import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getStatistics,
} from "../../services/statsService";

import { useAuth }
from "../../context/AuthContext";

import "./Statistics.css";

function Statistics() {

  const { user } =
    useAuth();

  const [stats,
    setStats] =
    useState(null);

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
      }
    };

  if (!stats) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="stats-page">

        <h1>
          📊 Reading Statistics
        </h1>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>
              Total Books
            </h3>
            <p>
              {
                stats.totalBooks
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Completed
            </h3>
            <p>
              {
                stats.completedBooks
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Currently Reading
            </h3>
            <p>
              {
                stats.currentlyReading
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Average Rating
            </h3>
            <p>
              {
                stats.averageRating
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Pages Read
            </h3>
            <p>
              {
                stats.totalPagesRead
              }
            </p>
          </div>

          <div className="stat-card">
            <h3>
              Favorite Genre
            </h3>
            <p>
              {
                stats.favoriteGenre
              }
            </p>
          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Statistics;