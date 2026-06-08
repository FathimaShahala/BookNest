

import "./ReviewCard.css";

function ReviewCard({
  review,
  onDelete,
}) {
  return (
    <div className="review-card">
      <div className="review-stars">
        {"★".repeat(
          review.rating
        )}
      </div>

      <h3>
        {review.title}
      </h3>

      <p>
        {review.review}
      </p>

      <small>
        By{" "}
        {
          review.userId
            ?.name
        }
      </small>

      <button
        onClick={() =>
          onDelete(
            review._id
          )
        }
      >
        Delete
      </button>
    </div>
  );
}

export default ReviewCard;