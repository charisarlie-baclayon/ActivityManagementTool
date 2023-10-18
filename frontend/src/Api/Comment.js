import axios from "axios";

export const readComments = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/comments/");
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readComment = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/comments/${id}/`);
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createComment = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/comments/", data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteComment = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/comments/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateComment = async (id, data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/comments/${id}/`, data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
