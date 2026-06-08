import "./StreakCard.css";

function StreakCard({
  currentStreak,
  longestStreak,
}) {
  return (
    <div className="streak-card">

      <h2>
        🔥 Reading Streak
      </h2>

      <div className="streak-info">

        <div>
          <h3>
            Current
          </h3>

          <p>
            {
              currentStreak
            } Days
          </p>
        </div>

        <div>
          <h3>
            Longest
          </h3>

          <p>
            {
              longestStreak
            } Days
          </p>
        </div>

      </div>

    </div>
  );
}

export default StreakCard;