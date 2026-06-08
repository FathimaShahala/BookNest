import {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import DashboardLayout
from "../../layouts/DashboardLayout";

import {
  getProfile,
  updateProfile,
} from "../../services/profileService";

import { useAuth }
from "../../context/AuthContext";

import "./EditProfile.css";

function EditProfile() {

  const { user } =
    useAuth();

  const navigate =
    useNavigate();

  const [
    formData,
    setFormData,
  ] = useState({
    profileImage: "",
    bio: "",
    favoriteGenre: "",
  });

  const [
    uploading,
    setUploading,
  ] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile =
    async () => {
      try {

        const profile =
          await getProfile(
            user.token
          );

        setFormData({
          profileImage:
            profile.profileImage || "",
          bio:
            profile.bio || "",
          favoriteGenre:
            profile.favoriteGenre || "",
        });

      } catch (error) {
        console.log(error);
      }
    };

  const handleChange =
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });
    };

  const handleImageUpload =
    async (e) => {

      try {

        const file =
          e.target.files[0];

        if (!file) return;

        setUploading(true);

        const uploadData =
          new FormData();

        uploadData.append(
          "image",
          file
        );

        const response =
          await axios.post(
            "http://localhost:5000/api/profile-upload",
            uploadData,
            {
              headers: {
                "Content-Type":
                  "multipart/form-data",
              },
            }
          );

        setFormData(
          (prev) => ({
            ...prev,
            profileImage:
              response.data.imageUrl,
          })
        );

      } catch (error) {
        console.log(error);
        alert(
          "Image upload failed"
        );
      } finally {
        setUploading(false);
      }
    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await updateProfile(
          formData,
          user.token
        );

        alert(
          "Profile updated successfully"
        );

        navigate(
          "/profile"
        );

      } catch (error) {
        console.log(error);
      }
    };

  return (
    <DashboardLayout>

      <div className="edit-profile-page">

        <form
          className="edit-profile-form"
          onSubmit={
            handleSubmit
          }
        >

          <h2>
            Edit Profile
          </h2>

          <div className="profile-preview">

            {formData.profileImage ? (
              <img
                src={
                  formData.profileImage
                }
                alt="Profile"
                className="profile-preview-image"
              />
            ) : (
              <div className="profile-placeholder">
                👤
              </div>
            )}

          </div>

          <label>
            Profile Image
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={
              handleImageUpload
            }
          />

          {uploading && (
            <p>
              Uploading...
            </p>
          )}

          <label>
            Bio
          </label>

          <textarea
            name="bio"
            rows="5"
            placeholder="Tell us about yourself..."
            value={
              formData.bio
            }
            onChange={
              handleChange
            }
          />

          <label>
            Favorite Genre
          </label>

          <input
            type="text"
            name="favoriteGenre"
            placeholder="Thriller, Fiction..."
            value={
              formData.favoriteGenre
            }
            onChange={
              handleChange
            }
          />

          <button
            type="submit"
          >
            Save Profile
          </button>

        </form>

      </div>

    </DashboardLayout>
  );
}

export default EditProfile;