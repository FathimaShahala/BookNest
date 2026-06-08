import axios from "axios";

const API_URL =
  "http://localhost:5000/api/streak";

const config = (
  token
) => ({
  headers: {
    Authorization:
      `Bearer ${token}`,
  },
});

export const getStreak =
  async (token) => {

    const response =
      await axios.get(
        API_URL,
        config(token)
      );

    return response.data;
};