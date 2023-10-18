import axios from "axios";

export const readTemplates = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/templates/"
    );
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readTemplate = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/templates/${id}/`
    );
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createTemplate = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/templates/",
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteTemplate = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/templates/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTemplate = async (id, data) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/templates/${id}/`,
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
