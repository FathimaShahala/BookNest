import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBookmark,
  FaTrashAlt,
} from "react-icons/fa";

import { useAuth } from "../../context/AuthContext";

import {
  getWishlist,
  removeWishlist,
} from "../../services/wishlistService";

import DashboardLayout from "../../layouts/DashboardLayout";

import "./Wishlist.css";

function Wishlist() {

  const { user } = useAuth();

  const [books, setBooks] = useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
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

  const handleRemove =
    async (
      e,
      bookId
    ) => {

      e.preventDefault();

      try {

        await removeWishlist(
          bookId,
          user.token
        );

        setBooks(
          books.filter(
            (book) =>
              book._id !==
              bookId
          )
        );

      } catch (error) {
        console.log(error);
      }

    };

  if (loading) {

    return (
      <DashboardLayout>

        <div className="wishlist-loading">
          Loading Wishlist...
        </div>

      </DashboardLayout>
    );

  }

  return (

    <DashboardLayout>

      <div className="wishlist-page">

        <div className="wishlist-header">

          <h1>
            <FaBookmark />
            My Wishlist
          </h1>

          <p>
            Books you'd love to
            read later.
          </p>

        </div>

        {books.length === 0 ? (

          <div className="wishlist-empty">

            <h2>
              📚 Empty Wishlist
            </h2>

            <p>
              Add books to your
              wishlist and they'll
              appear here.
            </p>

          </div>

        ) : (

          <div className="wishlist-grid">

            {books.map(
              (book) => (

                <Link
                  key={book._id}
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

                  <div className="wishlist-info">

                    <h3>
                      {book.title}
                    </h3>

                    <p>
                      {book.author}
                    </p>

                    <span className="genre-badge">
                      {book.genre}
                    </span>

                    <div className="wishlist-footer">

                      <span className="status">
                        {
                          book.readingStatus
                        }
                      </span>

                      <button
                        className="remove-btn"
                        onClick={(
                          e
                        ) =>
                          handleRemove(
                            e,
                            book._id
                          )
                        }
                      >
                        <FaTrashAlt />
                      </button>

                    </div>

                  </div>

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