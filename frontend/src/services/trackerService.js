import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/tracker`;

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

/* ===========================
   Get All Reading Sessions
=========================== */

export const getReadingSessions =
  async (token) => {

    const response =
      await axios.get(
        API_URL,
        getConfig(token)
      );

    return response.data;

  };

/* ===========================
   Add Reading Session
=========================== */

export const addReadingSession =
  async (
    session,
    token
  ) => {

    const response =
      await axios.post(
        API_URL,
        session,
        getConfig(token)
      );

    return response.data;

  };

/* ===========================
   Delete Reading Session
=========================== */

export const deleteReadingSession =
  async (
    id,
    token
  ) => {

    const response =
      await axios.delete(

        `${API_URL}/${id}`,

        getConfig(token)

      );

    return response.data;

  };