import axios from "axios";

export const readStudents = async (accessToken) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/students/", {
      headers: {
        //Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const readStudent = async (id, accessToken) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/students/${id}/`, {
      headers: {
        //Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const createStudent = async (data, accessToken) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/students/", data, {
      headers: {
        //Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const deleteStudent = async (id, accessToken) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/students/${id}/`, {
      headers: {
        //Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const updateStudent = async (id, data, accessToken) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/students/${id}/`, data, {
      headers: {
        //Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};
