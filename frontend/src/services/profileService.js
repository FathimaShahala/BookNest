import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/profile`;

const config = (
  token
) => ({
  headers: {
    Authorization:
      `Bearer ${token}`,
  },
});

export const getProfile =
  async (token) => {

    const response =
      await axios.get(
        API_URL,
        config(token)
      );

    return response.data;
};

export const updateProfile =
  async (
    profileData,
    token
  ) => {

    const response =
      await axios.put(
        API_URL,
        profileData,
        config(token)
      );

    return response.data;
};