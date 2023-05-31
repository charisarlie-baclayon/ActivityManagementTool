import axios from "axios";

export const createActivity = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/activities/",
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data)
  }
};
