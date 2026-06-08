import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  createReview,
  getBookReviews,
  deleteReview,
} from "../../services/reviewServices";

import ReviewForm from "../../components/ReviewForm/ReviewForm";
import ReviewCard from "../../components/ReviewCard/ReviewCard";

import "./Reviews.css";

function Reviews() {
  const { bookId } = useParams();

  const { user } = useAuth();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, [bookId]);

  const loadReviews = async () => {
    try {
      const data = await getBookReviews(
        bookId,
        user.token
      );

      setReviews(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateReview =
    async (reviewData) => {
      try {
        await createReview(
          {
            ...reviewData,
            bookId,
          },
          user.token
        );

        loadReviews();
      } catch (error) {
        console.error(error);
      }
    };

  const handleDeleteReview =
    async (reviewId) => {
      try {
        await deleteReview(
          reviewId,
          user.token
        );

        setReviews(
          reviews.filter(
            (review) =>
              review._id !== reviewId
          )
        );
      } catch (error) {
        console.error(error);
      }
    };

  if (loading) {
    return (
      <div className="reviews-loading">
        Loading Reviews...
      </div>
    );
  }

  return (
    <div className="reviews-page">
      <div className="reviews-container">

        <h1>
          Book Reviews
        </h1>

        <ReviewForm
          onSubmitReview={
            handleCreateReview
          }
        />

        <div className="reviews-list">
          {reviews.length === 0 ? (
            <div className="no-reviews">
              <h3>
                No Reviews Yet
              </h3>

              <p>
                Be the first to
                review this book.
              </p>
            </div>
          ) : (
            reviews.map(
              (review) => (
                <ReviewCard
                  key={
                    review._id
                  }
                  review={
                    review
                  }
                  onDelete={
                    handleDeleteReview
                  }
                />
              )
            )
          )}
        </div>

      </div>
    </div>
  );
}

export default Reviews;