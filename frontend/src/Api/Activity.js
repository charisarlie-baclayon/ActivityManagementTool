import axios from "axios";

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