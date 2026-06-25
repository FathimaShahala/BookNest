import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

import {
  getBookById,
  updateBook,
  uploadBookImage,
} from "../../services/bookService";

import "./EditBook.css";

function EditBook() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [uploading, setUploading] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [formData, setFormData] =
    useState({
      title: "",
      author: "",
      genre: "",
      description: "",
      coverImage: "",
      totalPages: "",
      currentPage: "",
      readingStatus:
        "Want To Read",
    });

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    try {
      const data =
        await getBookById(
          id,
          user.token
        );

      setFormData({
        title: data.title || "",
        author: data.author || "",
        genre: data.genre || "",
        description: data.description || "",
        coverImage: data.coverImage || "",
        totalPages: data.totalPages || "",
        currentPage: data.currentPage || "",
        readingStatus: data.readingStatus || "Want To Read",
        rating: data.rating || 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImageUpload =
    async (e) => {
      const file =
        e.target.files[0];

      if (!file) return;

      try {
        setUploading(true);

        const data =
          await uploadBookImage(
            file
          );

        setFormData((prev) => ({
          ...prev,
          coverImage:
            data.imageUrl,
        }));
      } catch (error) {
        console.error(error);

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
        await updateBook(
          id,
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

        navigate(
          `/books/${id}`
        );
      } catch (error) {
        console.error(error);

        alert(
          "Failed to update book"
        );
      }
    };

  if (loading) {
    return (
      <div className="edit-loading">
        Loading...
      </div>
    );
  }

  return (
    <div className="edit-book-page">
      <div className="edit-book-container">

        <h1>
          Edit Book
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >
          <input
            type="text"
            name="title"
            placeholder="Book Title"
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
            placeholder="Author"
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
            placeholder="Genre"
            value={
              formData.genre
            }
            onChange={
              handleChange
            }
          />

          <textarea
            rows="4"
            name="description"
            placeholder="Description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
          />

          <div className="image-upload">
            <label>
              Change Cover
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
            <p>
              Uploading image...
            </p>
          )}

          {formData.coverImage && (
            <div className="cover-preview">
              <img
                src={
                  formData.coverImage
                }
                alt="Cover"
              />
            </div>
          )}

          <input
            type="number"
            name="totalPages"
            placeholder="Total Pages"
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
          <div className="rating-display">
  ⭐ Rating: {formData.rating}/5
  <input
  type="number"
  name="rating"
  min="0"
  max="5"
  value={formData.rating}
  onChange={handleChange}
/>
</div>

          <button
            type="submit"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditBook;