import axios from "axios";

const API_URL =
  "http://localhost:5000/api/users";

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const addFavorite =
  async (bookId, token) => {
    const response =
      await axios.post(
        `${API_URL}/favorites/${bookId}`,
        {},
        getConfig(token)
      );

    return response.data;
  };

export const removeFavorite =
  async (bookId, token) => {
    const response =
      await axios.delete(
        `${API_URL}/favorites/${bookId}`,
        getConfig(token)
      );

    return response.data;
  };

export const getFavorites =
  async (token) => {
    const response =
      await axios.get(
        `${API_URL}/favorites`,
        getConfig(token)
      );

    return response.data;
  };