import axios from "axios";

const API_URL =
`${import.meta.env.VITE_API_URL}/reviews`;
//
  "http://localhost:5000/api/reviews";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Create Review
export const createReview = async (
  reviewData,
  token
) => {
  const response = await axios.post(
    API_URL,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get Reviews By Book
export const getBookReviews = async (
  bookId,
  token
) => {
  const response = await axios.get(
    `${API_URL}/book/${bookId}`,
    getConfig(token)
  );

  return response.data;
};

// Update Review
export const updateReview = async (
  reviewId,
  reviewData,
  token
) => {
  const response = await axios.put(
    `${API_URL}/${reviewId}`,
    reviewData,
    getConfig(token)
  );

  return response.data;
};

// Delete Review
export const deleteReview = async (
  reviewId,
  token
) => {
  const response = await axios.delete(
    `${API_URL}/${reviewId}`,
    getConfig(token)
  );

  return response.data;
};