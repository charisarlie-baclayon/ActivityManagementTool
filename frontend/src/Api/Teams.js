import axios from "axios";

export const readTeams = async (accessToken) => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/teams/", {
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

export const readTeam = async (id, accessToken) => {
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/teams/${id}/`, {
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

export const createTeam = async (data, accessToken) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/api/teams/", data, {
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

export const deleteTeam = async (id, accessToken) => {
  try {
    const response = await axios.delete(`http://127.0.0.1:8000/api/teams/${id}/`, {
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

export const updateTeam = async (id, data, accessToken) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/api/teams/${id}/`, data, {
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