import { useAuth } from "../../context/AuthContext";

import "./ReviewCard.css";

function ReviewCard({
  review,
  onDelete,
}) {

  const { user } = useAuth();

  const formattedDate =
    new Date(
      review.createdAt
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  const isOwner =
    review.userId?._id === user?._id;

  return (

    <div className="review-card">

      <div className="review-header">

        <div>

          <h3>
            {review.title}
          </h3>

          <small>
            By{" "}
            <strong>
              {review.userId?.name}
            </strong>

            {" • "}

            {formattedDate}

          </small>

        </div>

        <div className="review-stars">

          {[1, 2, 3, 4, 5].map(
            (star) => (

              <span
                key={star}
                className={
                  star <= review.rating
                    ? "filled"
                    : "empty"
                }
              >
                ★
              </span>

            )
          )}

        </div>

      </div>

      <p className="review-text">
        {review.review}
      </p>

      {isOwner && (

        <div className="review-footer">

          <button
            className="delete-review-btn"
            onClick={() =>
              onDelete(
                review._id
              )
            }
          >
            🗑 Delete
          </button>

        </div>

      )}

    </div>

  );

}

export default ReviewCard;