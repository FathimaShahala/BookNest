import { useEffect, useState } from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import GoalProgress from "../../components/GoalProgress/GoalProgress";
import StatsCard from "../../components/StatsCard/StatsCard";

import { useAuth } from "../../context/AuthContext";

import { getBooks } from "../../services/bookService";
import { getFavorites } from "../../services/favoriteService";

import "./Dashboard.css";

function Dashboard() {
  const { user } = useAuth();

  const [stats, setStats] = useState({
    booksRead: 0,
    pagesRead: 0,
    reviews: 0,
    favorites: 0,
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const books = await getBooks(user.token);

      const favorites =
        await getFavorites(user.token);

      const completedBooks =
        books.filter(
          (book) =>
            book.readingStatus ===
            "Completed"
        );

      const totalPages =
        completedBooks.reduce(
          (sum, book) =>
            sum +
            (book.totalPages || 0),
          0
        );

      const totalReviews =
        completedBooks.filter(
          (book) =>
            book.rating > 0
        ).length;

      setStats({
        booksRead:
          completedBooks.length,
        pagesRead:
          totalPages,
        reviews:
          totalReviews,
        favorites:
          favorites.length,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>

      <div className="dashboard-header">
        <h1>
          Welcome Back,
          {user?.name}
        </h1>

        <p>
          Track your reading
          journey and goals.
        </p>
      </div>

      <GoalProgress />

      <div className="stats-grid">

        <StatsCard
          title="Books Read"
          value={stats.booksRead}
        />

        <StatsCard
          title="Pages Read"
          value={stats.pagesRead}
        />

        <StatsCard
          title="Reviews"
          value={stats.reviews}
        />

        <StatsCard
          title="Favorites"
          value={stats.favorites}
        />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;