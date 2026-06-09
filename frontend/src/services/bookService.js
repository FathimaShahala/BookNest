import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/books`;

const getConfig = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`
  }
});

export const getBooks = async (token) => {
  const response = await axios.get(
    API_URL,
    getConfig(token)
  );

  return response.data;
};

export const getBookById = async (
  id,
  token
) => {
  const response = await axios.get(
    `${API_URL}/${id}`,
    getConfig(token)
  );

  return response.data;
};

export const createBook = async (
  bookData,
  token
) => {
  const response = await axios.post(
    API_URL,
    bookData,
    getConfig(token)
  );

  return response.data;
};

export const updateBook = async (
  id,
  bookData,
  token
) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    bookData,
    getConfig(token)
  );

  return response.data;
};

export const deleteBook = async (
  id,
  token
) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getConfig(token)
  );

  return response.data;
};

export const uploadBookImage =
  async (file) => {

    const formData =
      new FormData();

    formData.append(
      "image",
      file
    );

    const response =
      await axios.post(
        `${import.meta.env.VITE_API_URL}/upload`,
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

    return response.data;
  };