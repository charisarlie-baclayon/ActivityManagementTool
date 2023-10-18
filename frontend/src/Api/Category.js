import axios from "axios";

export const readCategories = async () => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8000/api/categories/"
    );
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readCategory = async (id) => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/categories/${id}/`
    );
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createCategory = async (data) => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/api/categories/",
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteCategory = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/categories/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateCategory = async (id, data) => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/categories/${id}/`,
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
