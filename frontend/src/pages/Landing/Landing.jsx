import { Link } from "react-router-dom";

import "./Landing.css";

function Landing() {
  return (
    <div className="landing">

      <div className="hero-section">

        <div className="hero-content">

          <h1>
            📚 Welcome to BookNest
          </h1>

          <p>
            Your personal reading companion.
            Track books, manage reading goals,
            write reviews, save notes, and
            celebrate achievements all in one place.
          </p>

          <div className="hero-buttons">

            <Link
              to="/register"
              className="primary-btn"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="secondary-btn"
            >
              Login
            </Link>

          </div>

        </div>

        <div className="hero-image">
          📖✨
        </div>

      </div>

      <div className="features-section">

        <h2>
          Why Choose BookNest?
        </h2>

        <div className="features-grid">

          <div className="feature-card">
            <span>📚</span>
            <h3>Track Books</h3>
            <p>
              Organize your reading
              journey effortlessly.
            </p>
          </div>

          <div className="feature-card">
            <span>🎯</span>
            <h3>Reading Goals</h3>
            <p>
              Set monthly and yearly
              reading targets.
            </p>
          </div>

          <div className="feature-card">
            <span>📝</span>
            <h3>Reviews & Notes</h3>
            <p>
              Save thoughts and reviews
              for every book.
            </p>
          </div>

          <div className="feature-card">
            <span>🏆</span>
            <h3>Achievements</h3>
            <p>
              Unlock badges and track
              your reading milestones.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Landing;