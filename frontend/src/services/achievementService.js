import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/achievements`;

const config =
  (token) => ({
    headers: {
      Authorization:
        `Bearer ${token}`,
    },
  });

export const getAchievements =
  async (token) => {
    const response =
      await axios.get(
        API_URL,
        config(token)
      );

    return response.data;
  };