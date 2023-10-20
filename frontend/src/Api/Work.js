import axios from "axios";

export const readWorks = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/works/");
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readWork = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/works/${id}/`);
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createWork = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/works/", data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteWork = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/works/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateWork = async (id, data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/works/${id}/`, data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
