import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";

import { useAuth } from "../../context/AuthContext";

import {
  getProfile,
} from "../../services/profileService";

import "./Profile.css";

function Profile() {

  const { user } = useAuth();

  const [profile, setProfile] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile =
    async () => {
      try {

        const data =
          await getProfile(
            user.token
          );

        setProfile(data);

      } catch (error) {

        console.log(error);

      } finally {

        setLoading(false);

      }
    };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="profile-loading">
          Loading Profile...
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>

      <div className="profile-page">

        <div className="profile-card">

          <img
            src={
              profile.profileImage ||
              "https://via.placeholder.com/160"
            }
            alt="Profile"
            className="profile-image"
          />

          <h2>{user.name}</h2>

          <p className="profile-email">
            {user.email}
          </p>

          <div className="profile-info">

            <div className="info-box">

              <h3>Bio</h3>

              <p>
                {profile.bio ||
                  "No bio added"}
              </p>

            </div>

            <div className="info-box">

              <h3>
                Favorite Genre
              </h3>

              <p>
                {profile.favoriteGenre ||
                  "Not Set"}
              </p>

            </div>

          </div>

          <div className="profile-stats">

            <div className="stat">

              <h3>
                {profile.stats?.totalBooks || 0}
              </h3>

              <p>Total Books</p>

            </div>

            <div className="stat">

              <h3>
                {profile.stats?.completedBooks || 0}
              </h3>

              <p>Completed</p>

            </div>

            <div className="stat">

              <h3>
                {profile.stats?.favorites || 0}
              </h3>

              <p>Favorites</p>

            </div>

            <div className="stat">

              <h3>
                {profile.stats?.achievements || 0}
              </h3>

              <p>Achievements</p>

            </div>

          </div>

          <Link
            to="/edit-profile"
            className="edit-profile-btn"
          >
            Edit Profile
          </Link>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default Profile;