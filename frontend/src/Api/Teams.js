import axios from "axios";

export const readTeams = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/teams/");
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const readTeam = async (id) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/teams/${id}/`);
    console.log(response.data); // Handle the response data
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
};

export const createTeam = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/teams/", data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteTeam = async (id) => {
  return await axios
    .delete(`http://127.0.0.1:8000/api/teams/${id}/`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const updateTeam = async (id, data) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/teams/${id}/`, data);
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error.response.data);
  }
};
