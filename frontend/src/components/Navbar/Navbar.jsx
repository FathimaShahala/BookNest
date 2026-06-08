import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

  const { user, logout } =
    useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-logo">
      <h2>BookNest</h2>
      </div>
      <div>

        <Link to="/">
          Home
        </Link>

        {user ? (
          <>
            <Link to="/dashboard">
              Dashboard
            </Link>

            <button
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;