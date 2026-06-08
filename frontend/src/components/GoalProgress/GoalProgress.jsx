import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";

import { getGoalProgress } from "../../services/goalServices";

import "./GoalProgress.css";

function GoalProgress() {
  const { user } = useAuth();

  const [goalData, setGoalData] =
    useState(null);

  useEffect(() => {
    loadProgress();
  }, []);

  const loadProgress =
    async () => {
      try {
        const data =
          await getGoalProgress(
            user.token
          );

        setGoalData(data);
      } catch (error) {
        console.log(error);
      }
    };

  if (!goalData) {
    return (
      <div className="goal-box">
        Loading Goal...
      </div>
    );
  }

  return (
    <div className="goal-box">

      <div className="goal-header">
        <h3>
          🎯 Reading Goal
        </h3>

        <span className="goal-percent">
          {
            goalData.yearlyProgress
          }%
        </span>
      </div>

      <div className="progress">

        <div
          className="fill"
          style={{
            width: `${goalData.yearlyProgress}%`,
          }}
        />

      </div>

      <div className="goal-details">

        <p>
          📚 Completed:
          {" "}
          {
            goalData.completedBooks
          }
        </p>

        <p>
          🎯 Goal:
          {" "}
          {
            goalData.yearlyGoal
          }
        </p>

      </div>

      <p className="goal-summary">
        {
          goalData.completedBooks
        }
        /
        {
          goalData.yearlyGoal
        }
        {" "}
        Books Completed
      </p>

    </div>
  );
}

export default GoalProgress;