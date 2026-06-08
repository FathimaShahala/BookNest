import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  getWishlist,
} from "../../services/wishlistService";

import DashboardLayout from "../../layouts/DashboardLayout";

import "./Wishlist.css";

function Wishlist() {
  const { user } = useAuth();

  const [books, setBooks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist =
    async () => {
      try {
        const data =
          await getWishlist(
            user.token
          );

        setBooks(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <DashboardLayout>
        <h2>
          Loading...
        </h2>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="wishlist-page">

        <h1>
          📚 Wishlist
        </h1>

        {books.length === 0 ? (
          <div className="wishlist-empty">
            No books in your
            wishlist.
          </div>
        ) : (
          <div className="wishlist-grid">

            {books.map(
              (book) => (
                <Link
                  key={
                    book._id
                  }
                  to={`/books/${book._id}`}
                  className="wishlist-card"
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
                    {
                      book.author
                    }
                  </p>

                  <span>
                    {book.genre}
                  </span>
                </Link>
              )
            )}

          </div>
        )}

      </div>

    </DashboardLayout>
  );
}

export default Wishlist;