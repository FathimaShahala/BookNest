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

  const [submitting, setSubmitting] =
    useState(false);

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    if (
      !title.trim() ||
      !review.trim()
    ) {
      return;
    }

    try {

      setSubmitting(true);

      await onSubmitReview({
        rating,
        title: title.trim(),
        review: review.trim(),
      });

      setRating(5);
      setTitle("");
      setReview("");

    } finally {

      setSubmitting(false);

    }

  };

  return (

    <form
      className="review-form"
      onSubmit={handleSubmit}
    >

      <h2>
        ⭐ Write a Review
      </h2>

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
        maxLength={100}
        required
      />

      <textarea
        rows="5"
        placeholder="Share your thoughts about this book..."
        value={review}
        onChange={(e) =>
          setReview(
            e.target.value
          )
        }
        maxLength={1000}
        required
      />

      <button
        type="submit"
        disabled={submitting}
      >
        {submitting
          ? "Submitting..."
          : "Submit Review"}
      </button>

    </form>

  );

}

export default ReviewForm;