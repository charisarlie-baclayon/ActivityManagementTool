import axios from "axios";

export const readTeachers = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/teachers/");
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readTeacher = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/teachers/${id}/`);
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createTeacher = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/teachers/", data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteTeacher = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/teachers/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTeacher = async (id, data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/teachers/${id}/`, data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
