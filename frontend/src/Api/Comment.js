import axios from "axios";

export const readComments = async (accessToken) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/comments/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const readComment = async (id, accessToken) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/comments/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const createComment = async (data, accessToken) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/comments/", data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const deleteComment = async (id, accessToken) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/comments/${id}/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const updateComment = async (id, data, accessToken) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/comments/${id}/`, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};
