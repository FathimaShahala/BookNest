import { useEffect, useState } from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import GoalProgress
from "../../components/GoalProgress/GoalProgress";

import StatsCard
from "../../components/StatsCard/StatsCard";

import StreakCard
from "../../components/StreakCard/StreakCard";

import { useAuth }
from "../../context/AuthContext";

import {
  getStatistics,
} from "../../services/statsService";

import {
  getStreak,
} from "../../services/streakService";

import "./Dashboard.css";

function Dashboard() {

  const { user } =
    useAuth();

  const [stats,
    setStats] =
    useState(null);

  const [streak,
    setStreak] =
    useState(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard =
    async () => {
      try {

        const statsData =
          await getStatistics(
            user.token
          );

        const streakData =
          await getStreak(
            user.token
          );

        setStats(
          statsData
        );

        setStreak(
          streakData
        );

      } catch (error) {
        console.log(error);
      }
    };

  if (!stats || !streak) {
    return (
      <DashboardLayout>
        Loading...
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <h1>
        Welcome Back 👋
      </h1>

      <GoalProgress />

      <StreakCard
        currentStreak={
          streak.currentStreak
        }
        longestStreak={
          streak.longestStreak
        }
      />

      <div className="stats-grid">

        <StatsCard
          title="Books Read"
          value={
            stats.completedBooks
          }
        />

        <StatsCard
          title="Pages Read"
          value={
            stats.totalPagesRead
          }
        />

        <StatsCard
          title="Currently Reading"
          value={
            stats.currentlyReading
          }
        />

        <StatsCard
          title="Average Rating"
          value={
            stats.averageRating
          }
        />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;