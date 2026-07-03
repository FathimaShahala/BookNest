import "./ProgressTracker.css";

function ProgressTracker({
  currentPage = 0,
  totalPages = 0,
}) {

  const progress =
    totalPages > 0
      ? Math.min(
          100,
          Math.round(
            (currentPage / totalPages) *
              100
          )
        )
      : 0;

  return (
    <div className="progress-container">

      <div className="progress-header">

        <h3>
          📖 Reading Progress
        </h3>

        <span className="progress-percentage">
          {progress}%
        </span>

      </div>

      <div className="progress-bar">

        <div
          className={`progress-fill ${
            progress === 100
              ? "completed"
              : ""
          }`}
          style={{
            width: `${progress}%`,
          }}
        />

      </div>

      <div className="progress-info">

        <span>
          {currentPage} Pages Read
        </span>

        <span>
          {totalPages} Total Pages
        </span>

      </div>

      <p className="progress-summary">
        {progress === 100
          ? "🎉 Congratulations! You've finished this book."
          : `${totalPages - currentPage} pages remaining`}
      </p>

    </div>
  );
}

export default ProgressTracker;