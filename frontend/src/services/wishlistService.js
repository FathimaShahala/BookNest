import axios from "axios";

const API_URL =

  `${import.meta.env.VITE_API_URL}/users`;

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const addWishlist =
  async (bookId, token) => {
    const response =
      await axios.post(
        `${API_URL}/wishlist/${bookId}`,
        {},
        getConfig(token)
      );

    return response.data;
  };

export const removeWishlist =
  async (bookId, token) => {
    const response =
      await axios.delete(
        `${API_URL}/wishlist/${bookId}`,
        getConfig(token)
      );

    return response.data;
  };

export const getWishlist =
  async (token) => {
    const response =
      await axios.get(
        `${API_URL}/wishlist`,
        getConfig(token)
      );

    return response.data;
  };