import { useState } from "react";

import "./StarRating.css";

function StarRating({
  rating,
  setRating,
}) {

  const [hover, setHover] =
    useState(0);

  const handleKeyDown = (
    e,
    star
  ) => {
    if (
      e.key === "Enter" ||
      e.key === " "
    ) {
      e.preventDefault();
      setRating(star);
    }
  };

  return (

    <div
      className="star-rating"
      aria-label="Book Rating"
    >

      {[1, 2, 3, 4, 5].map(
        (star) => (

          <span
            key={star}
            className={
              star <= (hover || rating)
                ? "star active"
                : "star"
            }
            onClick={() =>
              setRating(star)
            }
            onMouseEnter={() =>
              setHover(star)
            }
            onMouseLeave={() =>
              setHover(0)
            }
            onKeyDown={(e) =>
              handleKeyDown(
                e,
                star
              )
            }
            role="button"
            tabIndex={0}
            aria-label={`${star} Star${
              star > 1 ? "s" : ""
            }`}
            title={`${star} Star${
              star > 1 ? "s" : ""
            }`}
          >
            ★
          </span>

        )
      )}

    </div>

  );

}

export default StarRating;