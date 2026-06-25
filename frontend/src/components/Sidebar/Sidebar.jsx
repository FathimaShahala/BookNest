import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

import "./Sidebar.css";

function Sidebar({

  sidebarOpen,

  setSidebarOpen,

}) {

  const { logout } =
    useAuth();

  const navigate =
    useNavigate();

  const closeSidebar =
    () => {

      if (
        window.innerWidth <= 768
      ) {
        setSidebarOpen(false);
      }

    };

  const handleLogout =
    () => {

      const confirmLogout =
        window.confirm(
          "Are you sure you want to logout?"
        );

      if (!confirmLogout)
        return;

      logout();

      toast.success(
        "Logged out successfully"
      );

      // closeSidebar();

      navigate("/login");

    };

  return (

    <aside
      className={`sidebar ${
        sidebarOpen
          ? "open"
          : ""
      }`}
    >

      <div className="sidebar-top">

        <h2>
          📚 BookNest
        </h2>

        <button
          className="close-btn"
          onClick={() =>
            setSidebarOpen(false)
          }
        >
          ✕
        </button>

      </div>

      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/books"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          📖 My Books
        </NavLink>

        <NavLink
          to="/add-book"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          ➕ Add Book
        </NavLink>

        <NavLink
          to="/favorites"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          ⭐ Favorites
        </NavLink>

        <NavLink
          to="/wishlist"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          📚 Wishlist
        </NavLink>

        <NavLink
          to="/goals"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          🎯 Reading Goals
        </NavLink>

        <NavLink
          to="/statistics"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          📊 Statistics
        </NavLink>

        <NavLink
          to="/achievements"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          🏆 Achievements
        </NavLink>

        <NavLink
          to="/profile"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/settings"
          className="sidebar-link"
          onClick={closeSidebar}
        >
          ⚙️ Settings
        </NavLink>

        <button
          className="sidebar-link logout-btn"
          onClick={handleLogout}
        >
          🚪 Logout
        </button>

      </nav>

    </aside>

  );

}

export default Sidebar;