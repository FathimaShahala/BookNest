import { NavLink } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        <h2>📚 BookNest</h2>
      </div>

      <nav className="sidebar-nav">

        <NavLink
          to="/dashboard"
          className="sidebar-link"
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/books"
          className="sidebar-link"
        >
          📖 My Books
        </NavLink>

        <NavLink
          to="/add-book"
          className="sidebar-link"
        >
          ➕ Add Book
        </NavLink>

        <NavLink
          to="/favorites"
          className="sidebar-link"
        >
          ⭐ Favorites
        </NavLink>

        <NavLink
          to="/wishlist"
          className="sidebar-link"
        >
          📚 Wishlist
        </NavLink>

          <NavLink
          to="/goals"
          className="sidebar-link"
        >
          🎯 Reading Goals
        </NavLink>

        <NavLink
          to="/statistics"
          className="sidebar-link"
        >
          📊 Statistics
        </NavLink>

        <NavLink
  to="/achievements"
  className="sidebar-link"
>
  🏆 Achievements
</NavLink>

        <NavLink
          to="/profile"
          className="sidebar-link"
        >
          👤 Profile
        </NavLink>

        <NavLink
          to="/settings"
          className="sidebar-link"
        >
          ⚙️ Settings
        </NavLink>

        <NavLink
          to="/logout"
          className="sidebar-link logout"
        >
          🚪 Logout
        </NavLink>

      </nav>

    </aside>
  );
}

export default Sidebar;