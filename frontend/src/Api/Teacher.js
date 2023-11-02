import axios from "axios";

export const readTeachers = async (accessToken) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/teachers/", {
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

export const readTeacher = async (id, accessToken) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/teachers/${id}/`, {
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

export const createTeacher = async (data, accessToken) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/teachers/", data, {
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

export const deleteTeacher = async (id, accessToken) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/teachers/${id}/`, {
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

export const updateTeacher = async (id, data, accessToken) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/teachers/${id}/`, data, {
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
