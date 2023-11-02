import axios from "axios";

export const readActivities = async (accessToken) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/activities/", {
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

export const readActivity = async (id, accessToken) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/activities/${id}/`, {
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

export const createActivity = async (data, accessToken) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/activities/", data, {
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

export const deleteActivity = async (id, accessToken) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/activities/${id}/`, {
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

export const updateActivity = async (id, data, accessToken) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/activities/${id}/`, data, {
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
