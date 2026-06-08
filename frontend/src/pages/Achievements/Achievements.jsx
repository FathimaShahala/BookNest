import {
  useEffect,
  useState,
} from "react";

import DashboardLayout
from "../../layouts/DashboardLayout";

import { useAuth }
from "../../context/AuthContext";

import {
  getAchievements,
} from "../../services/achievementService";

import "./Achievements.css";

function Achievements() {

  const { user } =
    useAuth();

  const [
    achievements,
    setAchievements,
  ] = useState([]);

  useEffect(() => {
    loadAchievements();
  }, []);

  const loadAchievements =
    async () => {
      try {
        const data =
          await getAchievements(
            user.token
          );

        setAchievements(
          data
        );
      } catch (error) {
        console.log(error);
      }
    };
console.log(achievements);
  return (
    <DashboardLayout>

      <div className="achievements-page">

        <h1>
          🏆 Reading Achievements
        </h1>

        <div className="achievement-grid">

          {achievements.map(
            (
              achievement
            ) => {

              const percent =
                Math.min(
                  (
                    achievement.progress /
                    achievement.target
                  ) *
                    100,
                  100
                );

              return (
                <div
                  key={
                    achievement.title
                  }
                  className={`achievement-card ${
                    achievement.unlocked
                      ? "unlocked"
                      : "locked"
                  }`}
                >

                  <div className="achievement-icon">
                    {
                      achievement.icon
                    }
                  </div>

                  <h3>
                    {
                      achievement.title
                    }
                  </h3>

                  <p>
                    {
                      achievement.progress
                    }
                    /
                    {
                      achievement.target
                    }
                    {" "}
                    books
                  </p>

                  <div className="achievement-progress">

                    <div
                      className="achievement-fill"
                      style={{
                        width:
                          `${percent}%`,
                      }}
                    />

                  </div>

                  <span>

                    {achievement.unlocked
                      ? "✅ Unlocked"
                      : "🔒 Locked"}

                  </span>

                </div>
              );
            }
          )}

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Achievements;