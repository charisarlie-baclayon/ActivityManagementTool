import axios from "axios";

export const readActivities = async (accessToken) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/activities/", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error;
  }
};

export const readActivity = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/activities/${id}/`
    );
    console.log(response.data); // Handle the response data
    return response.data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createActivity = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/activities/",
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteActivity = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/activities/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateActivity = async (id, data) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/activities/${id}/`,
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
