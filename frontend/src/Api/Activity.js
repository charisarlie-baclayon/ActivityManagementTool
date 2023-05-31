export const createActivity = async (data) => {
  try {
    const response = await axios.post(
      "https://localhost:7220/api/Movies",
      data
    );
    console.log(response.data); // Handle the response data
  } catch (error) {
    console.log(error);
  }
};
