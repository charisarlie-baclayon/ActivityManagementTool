import axios from "axios";

export const readStudents = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/students/");
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readStudent = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/students/${id}/`);
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createStudent = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/students/", data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteStudent = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/students/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateStudent = async (id, data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
