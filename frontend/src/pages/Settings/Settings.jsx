import DashboardLayout
from "../../layouts/DashboardLayout";

import { useNavigate }
from "react-router-dom";

import { useAuth }
from "../../context/AuthContext";

import {
  useTheme,
} from "../../context/ThemeContext";

import "./Settings.css";

function Settings() {

  const navigate =
    useNavigate();

  const { logout } =
    useAuth();

  const {
    theme,
    toggleTheme,
  } = useTheme();

  const handleLogout =
    () => {

      logout();

      navigate(
        "/login"
      );
    };

  return (
    <DashboardLayout>

      <div className="settings-page">

        <h1>
          ⚙ Settings
        </h1>

        {/* Appearance */}

        <div className="settings-section">

          <h2>
            Appearance
          </h2>

          <p>
            Customize the look and feel
            of BookNest.
          </p>

          <button
            className="settings-btn"
            onClick={
              toggleTheme
            }
          >
            {theme === "light"
              ? "🌙 Switch to Dark Mode"
              : "☀️ Switch to Light Mode"}
          </button>

        </div>

        {/* Account */}

        <div className="settings-section">

          <h2>
            Account
          </h2>

          <p>
            Manage your profile
            information.
          </p>

          <button
            className="settings-btn"
            onClick={() =>
              navigate(
                "/edit-profile"
              )
            }
          >
            ✏ Edit Profile
          </button>

        </div>

        {/* Reading Goals */}

        <div className="settings-section">

          <h2>
            Reading Goals
          </h2>

          <p>
            Update your monthly and
            yearly reading targets.
          </p>

          <button
            className="settings-btn"
            onClick={() =>
              navigate(
                "/goals"
              )
            }
          >
            📚 Manage Goals
          </button>

        </div>

        {/* Statistics */}

        <div className="settings-section">

          <h2>
            Statistics
          </h2>

          <p>
            View your reading analytics
            and progress.
          </p>

          <button
            className="settings-btn"
            onClick={() =>
              navigate(
                "/statistics"
              )
            }
          >
            📊 View Statistics
          </button>

        </div>

        {/* Achievements */}

        <div className="settings-section">

          <h2>
            Achievements
          </h2>

          <p>
            View your unlocked reading
            milestones.
          </p>

          <button
            className="settings-btn"
            onClick={() =>
              navigate(
                "/achievements"
              )
            }
          >
            🏆 View Achievements
          </button>

        </div>

        {/* Danger Zone */}

        <div className="settings-section danger-zone">

          <h2>
            Account Actions
          </h2>

          <p>
            Logout from your account.
          </p>

          <button
            className="logout-btn"
            onClick={
              handleLogout
            }
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Settings;