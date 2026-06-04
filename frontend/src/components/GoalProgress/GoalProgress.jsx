import "./GoalProgress.css";

function GoalProgress() {

  const completed = 8;
  const goal = 20;

  const progress =
    (completed / goal) * 100;

  return (
    <div className="goal-box">

      <h3>
        Reading Goal
      </h3>

      <div className="progress">

        <div
          className="fill"
          style={{
            width:
            `${progress}%`
          }}
        />

      </div>

      <p>
        {completed}/{goal}
      </p>

    </div>
  );
}

export default GoalProgress;