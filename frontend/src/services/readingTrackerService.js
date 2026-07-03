import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/reading-tracker`;

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// ==============================
// Get All Reading Sessions
// ==============================
export const getReadingSessions =
  async (token) => {
    const response =
      await axios.get(
        API_URL,
        getConfig(token)
      );

    return response.data;
  };

// ==============================
// Add Reading Session
// ==============================
export const addReadingSession =
  async (
    sessionData,
    token
  ) => {
    const response =
      await axios.post(
        API_URL,
        sessionData,
        getConfig(token)
      );

    return response.data;
  };

// ==============================
// Delete Reading Session
// ==============================
export const deleteReadingSession =
  async (
    sessionId,
    token
  ) => {
    const response =
      await axios.delete(
        `${API_URL}/${sessionId}`,
        getConfig(token)
      );

    return response.data;
  };

// ==============================
// Tracker Summary
// ==============================
export const getTrackerSummary =
  async (token) => {
    const response =
      await axios.get(
        `${API_URL}/summary`,
        getConfig(token)
      );

    return response.data;
  };