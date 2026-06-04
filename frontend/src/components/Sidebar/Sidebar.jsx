import "./Sidebar.css";

import {
  Link
} from "react-router-dom";

function Sidebar() {

  return (
    <aside
      className="sidebar"
    >

      <h2>
        BookNest
      </h2>

      <nav>

        <Link
          to="/dashboard"
        >
          Dashboard
        </Link>

        <Link
          to="/books"
        >
          My Books
        </Link>

        <Link
          to="/goals"
        >
          Goals
        </Link>

        <Link
          to="/reviews"
        >
          Reviews
        </Link>

        <Link
          to="/favorites"
        >
          Favorites
        </Link>

        <Link
          to="/profile"
        >
          Profile
        </Link>

      </nav>

    </aside>
  );
}

export default Sidebar;