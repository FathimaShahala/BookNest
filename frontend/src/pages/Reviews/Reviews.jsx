import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

import DashboardLayout from "../../layouts/DashboardLayout";

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
      setLoading(true);

      const data = await getBookReviews(
        bookId,
        user.token
      );

      setReviews(data);

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to load reviews."
      );

    } finally {
      setLoading(false);
    }
  };

  const handleCreateReview = async (
    reviewData
  ) => {
    try {
      await createReview(
        {
          ...reviewData,
          bookId,
        },
        user.token
      );

      toast.success(
        "Review added successfully."
      );

      loadReviews();

    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to add review."
      );
    }
  };

  const handleDeleteReview = async (
    reviewId
  ) => {
    const confirmDelete =
      window.confirm(
        "Delete this review?"
      );

    if (!confirmDelete) return;

    try {
      await deleteReview(
        reviewId,
        user.token
      );

      setReviews((prev) =>
        prev.filter(
          (review) =>
            review._id !== reviewId
        )
      );

      toast.success(
        "Review deleted."
      );

    } catch (error) {
      console.log(error);

      toast.error(
        "Failed to delete review."
      );
    }
  };

  return (
    <DashboardLayout>
      <div className="reviews-page">
        <div className="reviews-container">

          <div className="reviews-header">
            <h1>⭐ Book Reviews</h1>
            <p>
              Share your thoughts and read
              what others think.
            </p>
          </div>

          <ReviewForm
            onSubmitReview={
              handleCreateReview
            }
          />

          {loading ? (
            <div className="reviews-loading">
              Loading reviews...
            </div>
          ) : (
            <div className="reviews-list">

              {reviews.length === 0 ? (
                <div className="no-reviews">
                  <h3>
                    No Reviews Yet 📖
                  </h3>

                  <p>
                    Be the first to review
                    this book.
                  </p>
                </div>
              ) : (
                reviews.map((review) => (
                  <ReviewCard
                    key={review._id}
                    review={review}
                    onDelete={
                      handleDeleteReview
                    }
                  />
                ))
              )}

            </div>
          )}

        </div>
      </div>
    </DashboardLayout>
  );
}

export default Reviews;