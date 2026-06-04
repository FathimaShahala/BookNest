import DashboardLayout
from "../../layouts/DashboardLayout";

import GoalProgress
from "../../components/GoalProgress/GoalProgress";

import StatsCard
from "../../components/StatsCard/StatsCard";

import "./Dashboard.css";

function Dashboard() {

  return (
    <DashboardLayout>

      <h1>
        Welcome Back
      </h1>

      <GoalProgress />

      <div
        className="stats-grid"
      >

        <StatsCard
          title="Books Read"
          value="24"
        />

        <StatsCard
          title="Pages Read"
          value="7850"
        />

        <StatsCard
          title="Reviews"
          value="12"
        />

        <StatsCard
          title="Reading Streak"
          value="15 Days"
        />

      </div>

    </DashboardLayout>
  );
}

export default Dashboard;