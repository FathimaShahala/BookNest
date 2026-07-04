import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/heatmap`;

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getHeatmap = async (token) => {

  const response =
    await axios.get(
      API_URL,
      getConfig(token)
    );

  return response.data;

};