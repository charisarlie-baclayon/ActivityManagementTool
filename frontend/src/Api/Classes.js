import axios from "axios";

export const readClasses = async (accessToken) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/classes/", {
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

export const readClass = async (id, accessToken) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/classes/${id}/`, {
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

export const createClass = async (data, accessToken) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/classes/", data, {
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

export const deleteClass = async (id, accessToken) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/classes/${id}/`, {
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

export const updateClass = async (id, data, accessToken) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/classes/${id}/`, data, {
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
