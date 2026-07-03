import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import {
  getGoal,
  saveGoal,
} from "../../services/goalServices";
import { useAuth } from "../../context/AuthContext";
import {
  FaCalendarAlt,
  FaBook,
  FaBullseye,
} from "react-icons/fa";

import "./Goals.css";

function Goals() {
  const { user } = useAuth();

  const [yearlyGoal, setYearlyGoal] = useState("");
  const [monthlyGoal, setMonthlyGoal] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadGoal();
  }, []);

  const loadGoal = async () => {
    try {
      const data = await getGoal(user.token);

      setYearlyGoal(data.yearlyGoal || "");
      setMonthlyGoal(data.monthlyGoal || "");
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await saveGoal(
        {
          yearlyGoal,
          monthlyGoal,
        },
        user.token
      );

      setMessage("🎉 Goals saved successfully!");

      setTimeout(() => {
        setMessage("");
      }, 3000);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="goals-page">

        <div className="goals-header">
          <h1>🎯 Reading Goals</h1>

          <p>
            Stay motivated by setting
            realistic monthly and yearly
            reading goals.
          </p>
        </div>

        <div className="goal-summary">

          <div className="summary-card">
            <FaCalendarAlt className="summary-icon" />

            <h3>Yearly Goal</h3>

            <h2>
              {yearlyGoal || 0}
            </h2>

            <span>Books</span>
          </div>

          <div className="summary-card">
            <FaBook className="summary-icon" />

            <h3>Monthly Goal</h3>

            <h2>
              {monthlyGoal || 0}
            </h2>

            <span>Books</span>
          </div>

        </div>

        <form
          className="goal-form"
          onSubmit={handleSubmit}
        >

          <div className="input-group">

            <label>
              <FaBullseye />
              Yearly Goal
            </label>

            <input
              type="number"
              min="0"
              placeholder="Example: 50"
              value={yearlyGoal}
              onChange={(e) =>
                setYearlyGoal(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>
              <FaBullseye />
              Monthly Goal
            </label>

            <input
              type="number"
              min="0"
              placeholder="Example: 5"
              value={monthlyGoal}
              onChange={(e) =>
                setMonthlyGoal(e.target.value)
              }
            />

          </div>

          <button type="submit">
            💾 Save Goals
          </button>

          {message && (
            <p className="success-message">
              {message}
            </p>
          )}

        </form>

      </div>
    </DashboardLayout>
  );
}

export default Goals;