import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/books`;

const config = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getFavorites =
  async (token) => {

    const response =
      await axios.get(
        `${API_URL}/favorites`,
        config(token)
      );

    return response.data;
  };