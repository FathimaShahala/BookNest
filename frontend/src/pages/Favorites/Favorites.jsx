import {
  useEffect,
  useState,
} from "react";
import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getFavorites,
} from "../../services/favoriteService";

import { useAuth }
from "../../context/AuthContext";

import "./Favorites.css";

function Favorites() {
  const { user } =
    useAuth();

  const [books, setBooks] =
    useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites =
    async () => {
      try {
        const data =
          await getFavorites(
            user.token
          );

        setBooks(data);
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>
      <div className="favorites-page">
        <h1>
          Favorite Books
        </h1>

      <div className="favorites-grid">
        {books.map(
          (book) => (
            <div
              key={book._id}
              className="favorite-card"
            >
              <img
                src={
                  book.coverImage
                }
                alt={
                  book.title
                }
              />

              <h3>
                {book.title}
              </h3>

              <p>
                {book.author}
              </p>
            </div>
          )
        )}
      </div>
    </div>
    </DashboardLayout>
  );
}

export default Favorites;