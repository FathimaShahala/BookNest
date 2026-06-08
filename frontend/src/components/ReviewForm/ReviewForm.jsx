import { useState } from "react";

import StarRating from "../StarRating/StarRating";

import "./ReviewForm.css";

function ReviewForm({
  onSubmitReview,
}) {
  const [rating, setRating] =
    useState(5);

  const [title, setTitle] =
    useState("");

  const [review, setReview] =
    useState("");

  const handleSubmit = (
    e
  ) => {
    e.preventDefault();

    onSubmitReview({
      rating,
      title,
      review,
    });

    setTitle("");
    setReview("");
    setRating(5);
  };

  return (
    <form
      className="review-form"
      onSubmit={handleSubmit}
    >
      <h2>Write Review</h2>

      <StarRating
        rating={rating}
        setRating={setRating}
      />

      <input
        type="text"
        placeholder="Review Title"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
        required
      />

      <textarea
        rows="5"
        placeholder="Write your review..."
        value={review}
        onChange={(e) =>
          setReview(
            e.target.value
          )
        }
        required
      />

      <button
        type="submit"
      >
        Submit Review
      </button>
    </form>
  );
}

export default ReviewForm;