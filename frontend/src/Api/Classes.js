import axios from "axios";

export const readClasses = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/classes/");
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readClass = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/classes/${id}/`);
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createClass = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/classes/", data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteClass = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/classes/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateClass = async (id, data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/classes/${id}/`, data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
