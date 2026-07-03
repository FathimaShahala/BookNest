import DashboardLayout from "../../layouts/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

import {
  FaMoon,
  FaSun,
  FaUserEdit,
  FaBullseye,
  FaChartBar,
  FaTrophy,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Settings.css";

function Settings() {

  const navigate = useNavigate();

  const { logout } = useAuth();

  const { theme, toggleTheme } = useTheme();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <DashboardLayout>

      <div className="settings-page">

        <div className="settings-header">
          <h1>⚙ Settings</h1>

          <p>
            Personalize your BookNest
            experience and manage your account.
          </p>
        </div>

        <div className="settings-grid">

          <div className="settings-card">
            <div className="settings-icon">
              {theme === "light" ? (
                <FaMoon />
              ) : (
                <FaSun />
              )}
            </div>

            <h3>Appearance</h3>

            <p>
              Switch between light and dark mode.
            </p>

            <button
              className="settings-btn"
              onClick={toggleTheme}
            >
              {theme === "light"
                ? "Dark Mode"
                : "Light Mode"}
            </button>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              <FaUserEdit />
            </div>

            <h3>Edit Profile</h3>

            <p>
              Update your profile information and picture.
            </p>

            <button
              className="settings-btn"
              onClick={() =>
                navigate("/edit-profile")
              }
            >
              Edit Profile
            </button>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              <FaBullseye />
            </div>

            <h3>Reading Goals</h3>

            <p>
              Set your monthly and yearly reading targets.
            </p>

            <button
              className="settings-btn"
              onClick={() =>
                navigate("/goals")
              }
            >
              Manage Goals
            </button>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              <FaChartBar />
            </div>

            <h3>Statistics</h3>

            <p>
              View your reading analytics and progress.
            </p>

            <button
              className="settings-btn"
              onClick={() =>
                navigate("/statistics")
              }
            >
              View Statistics
            </button>
          </div>

          <div className="settings-card">
            <div className="settings-icon">
              <FaTrophy />
            </div>

            <h3>Achievements</h3>

            <p>
              Check your unlocked reading milestones.
            </p>

            <button
              className="settings-btn"
              onClick={() =>
                navigate("/achievements")
              }
            >
              View Achievements
            </button>
          </div>

          <div className="settings-card danger-card">

            <div className="settings-icon danger-icon">
              <FaSignOutAlt />
            </div>

            <h3>Logout</h3>

            <p>
              Securely sign out from your BookNest account.
            </p>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Settings;