import "./StreakCard.css";

function StreakCard({
  currentStreak = 0,
  longestStreak = 0,
}) {

  return (
    <div className="streak-card">

      <div className="streak-header">

        <h2>🔥 Reading Streak</h2>

        <span className="streak-badge">
          Keep Going!
        </span>

      </div>

      <div className="streak-info">

        <div className="streak-box">

          <h3>Current</h3>

          <h1>
            {currentStreak}
          </h1>

          <p>Days</p>

        </div>

        <div className="streak-box">

          <h3>Longest</h3>

          <h1>
            {longestStreak}
          </h1>

          <p>Days</p>

        </div>

      </div>

      <div className="streak-footer">

        {currentStreak === 0 ? (
          <p>
            📚 Start reading today to begin your streak.
          </p>
        ) : (
          <p>
            🚀 You've read for <strong>{currentStreak}</strong> consecutive days!
          </p>
        )}

      </div>

    </div>
  );
}

export default StreakCard;