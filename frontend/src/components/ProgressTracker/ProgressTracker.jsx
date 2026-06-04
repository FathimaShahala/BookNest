import "./ProgressTracker.css";

function ProgressTracker({
  currentPage,
  totalPages
}) {
  const progress =
    totalPages > 0
      ? Math.round(
          (currentPage / totalPages) *
            100
        )
      : 0;

  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${progress}%`
          }}
        />
      </div>

      <p>
        {currentPage} / {totalPages}
        pages ({progress}%)
      </p>
    </div>
  );
}

export default ProgressTracker;