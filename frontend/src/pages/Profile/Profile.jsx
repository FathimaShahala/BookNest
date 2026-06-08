import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import DashboardLayout
from "../../layouts/DashboardLayout";

import { useAuth }
from "../../context/AuthContext";

import {
  getProfile,
} from "../../services/profileService";

import "./Profile.css";

function Profile() {

  const { user } =
    useAuth();

  const [profile,
    setProfile] =
    useState(null);

  useEffect(() => {
    loadProfile();
  }, []);

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
      }
    };

  if (!profile) {
    return (
      <DashboardLayout>
        Loading...
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
              "https://via.placeholder.com/150"
            }
            alt="Profile"
            className="profile-image"
          />

          <h2>
            {user.name}
          </h2>

          <p>
            {user.email}
          </p>

          <div className="profile-info">

            <h3>
              Bio
            </h3>

            <p>
              {profile.bio ||
                "No bio added"}
            </p>

            <h3>
              Favorite Genre
            </h3>

            <p>
              {profile.favoriteGenre ||
                "Not set"}
            </p>

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