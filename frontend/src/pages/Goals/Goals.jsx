import {
  useEffect,
  useState,
} from "react";

import DashboardLayout from "../../layouts/DashboardLayout";

import {
  getGoal,
  saveGoal,
} from "../../services/goalServices";

import { useAuth } from "../../context/AuthContext";

import "./Goals.css";

function Goals() {
  const { user } =
    useAuth();

  const [yearlyGoal,
    setYearlyGoal] =
    useState("");

  const [monthlyGoal,
    setMonthlyGoal] =
    useState("");

  useEffect(() => {
    loadGoal();
  }, []);

  const loadGoal =
    async () => {
      try {
        const data =
          await getGoal(
            user.token
          );

        setYearlyGoal(
          data.yearlyGoal
        );

        setMonthlyGoal(
          data.monthlyGoal
        );
      } catch (error) {
        console.log(error);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await saveGoal(
          {
            yearlyGoal,
            monthlyGoal,
          },
          user.token
        );

        alert(
          "Goals Saved"
        );
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <div className="goals-page">

        <h1>
          🎯 Reading Goals
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="goal-form"
        >

          <label>
            Yearly Goal
          </label>

          <input
            type="number"
            value={
              yearlyGoal
            }
            onChange={(e) =>
              setYearlyGoal(
                e.target
                  .value
              )
            }
          />

          <label>
            Monthly Goal
          </label>

          <input
            type="number"
            value={
              monthlyGoal
            }
            onChange={(e) =>
              setMonthlyGoal(
                e.target
                  .value
              )
            }
          />

          <button
            type="submit"
          >
            Save Goals
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default Goals;