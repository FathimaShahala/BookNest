
import "./Navbar.css";

import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function Navbar() {

  const { user } =
    useAuth();

  return (

    <header className="navbar">

      <div className="navbar-container">

        <Link
          to="/"
          className="navbar-logo"
        >
          📚 BookNest
        </Link>

        <nav className="navbar-links">

          <Link to="/">
            Home
          </Link>

          {user ? (

            <Link to="/dashboard">
              Dashboard
            </Link>

          ) : (

            <>

              <Link to="/login">
                Login
              </Link>

              <Link
                to="/register"
                className="register-btn"
              >
                Register
              </Link>

            </>

          )}

        </nav>

      </div>

    </header>

  );

}

export default Navbar;
