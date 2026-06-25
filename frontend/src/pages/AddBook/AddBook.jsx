import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";
import {
  createBook,
  uploadBookImage,
} from "../../services/bookService";

import "./AddBook.css";
import DashboardLayout from "../../layouts/DashboardLayout";

function AddBook() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [uploading, setUploading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      title: "",
      author: "",
      genre: "",
      description: "",
      coverImage: "",
      totalPages: "",
      currentPage: 0,
      readingStatus: "Want To Read",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

 const handleImageUpload = async (e) => {
  console.log("IMAGE SELECTED");

  const file = e.target.files[0];

  if (!file) return;

  try {
    setUploading(true);

    console.log("STARTING UPLOAD");

    const data =
      await uploadBookImage(file);

    console.log(
      "UPLOAD RESPONSE:",
      data
    );

    setFormData((prev) => ({
      ...prev,
      coverImage:
        data.imageUrl,
    }));

  } catch (error) {

    console.log(
      "UPLOAD ERROR:",
      error.response?.data
    );

    console.error(error);

  } finally {
    setUploading(false);
  }
};
  const handleSubmit =
    async (e) => {
      e.preventDefault();

      if (
        !formData.title ||
        !formData.author ||
        !formData.genre ||
        !formData.totalPages
      ) {
        alert(
          "Please fill all required fields"
        );
        return;
      }

      try {
        await createBook(
          {
            ...formData,
            totalPages:
              Number(
                formData.totalPages
              ),
            currentPage:
              Number(
                formData.currentPage
              ),
          },
          user.token
        );

        navigate("/books");
      } catch (error) {
        console.error(error);

        alert(
          "Failed to add book"
        );
      }
    };

  return (
    <DashboardLayout>
    <div className="add-book-page">
      <div className="add-book-container">
        <h1>
          Add New Book
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="title"
            placeholder="Book Title *"
            value={
              formData.title
            }
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="author"
            placeholder="Author *"
            value={
              formData.author
            }
            onChange={
              handleChange
            }
          />

          <input
            type="text"
            name="genre"
            placeholder="Genre *"
            value={
              formData.genre
            }
            onChange={
              handleChange
            }
          />

          <textarea
            name="description"
            placeholder="Book Description"
            rows="4"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <div className="image-upload">
            <label>
              Book Cover
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
            />
          </div>

          {uploading && (
            <p className="uploading-text">
              Uploading image...
            </p>
          )}

          {formData.coverImage && (
            <div className="image-preview">
              <img
                src={
                  formData.coverImage
                }
                alt="Book Cover Preview"
              />
            </div>
          )}

          <input
            type="number"
            name="totalPages"
            placeholder="Total Pages *"
            value={
              formData.totalPages
            }
            onChange={
              handleChange
            }
          />

          <input
            type="number"
            name="currentPage"
            placeholder="Current Page"
            value={
              formData.currentPage
            }
            onChange={
              handleChange
            }
          />

          <select
            name="readingStatus"
            value={
              formData.readingStatus
            }
            onChange={
              handleChange
            }
          >
            <option value="Want To Read">
              Want To Read
            </option>

            <option value="Currently Reading">
              Currently Reading
            </option>

            <option value="Next To Read">
              Next To Read
            </option>

            <option value="Completed">
              Completed
            </option>
          </select>

          <button
            type="submit"
            disabled={
              uploading
            }
          >
            {uploading
              ? "Uploading..."
              : "Add Book"}
          </button>
        </form>
      </div>
    </div>
    </DashboardLayout>
  );
}

export default AddBook;