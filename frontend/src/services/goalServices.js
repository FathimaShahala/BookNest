import axios from "axios";

const API_URL =
  "http://localhost:5000/api/goals";

const config = (
  token
) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getGoal =
  async (token) => {
    const response =
      await axios.get(
        API_URL,
        config(token)
      );

    return response.data;
  };

export const saveGoal =
  async (
    goalData,
    token
  ) => {
    const response =
      await axios.post(
        API_URL,
        goalData,
        config(token)
      );

    return response.data;
  };

  export const getGoalProgress =
  async (token) => {
    const response =
      await axios.get(
        `${API_URL}/progress`,
        config(token)
      );

    return response.data;
  };