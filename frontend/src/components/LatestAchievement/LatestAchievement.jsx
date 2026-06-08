import "./LatestAchievement.css";

function LatestAchievement({
  achievement,
}) {

  if (!achievement)
    return null;

  return (
    <div className="latest-achievement">

      <h2>
        🏆 Latest Achievement
      </h2>

      <div className="achievement-content">

        <span className="achievement-icon">
          {
            achievement.icon
          }
        </span>

        <div>

          <h3>
            {
              achievement.title
            }
          </h3>

          <p>
            {
              achievement.description
            }
          </p>

        </div>

      </div>

    </div>
  );
}

export default LatestAchievement;