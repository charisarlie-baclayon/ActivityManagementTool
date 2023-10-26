import axios from "axios";

export const loginTeacher = async (email, password) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/teachers/login/", {
            email,
            password,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}

export const loginStudent = async (email, password) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/students/login/", {
          email,
          password,
        });

        return response.data;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
}

export const acquireToken = async (email, password) => {
    try {
        const response = await axios.post("http://127.0.0.1:8000/tokens/acquire", {
        email,
        password,
        });
        return response.data;
    } catch (error) {
        console.log(error.response.data);
        throw error;
    }
};

export const refreshToken = async (refreshToken) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/tokens/refresh", {
        refresh: refreshToken,
      });
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
};
  
export const verifyToken = async (token) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/tokens/verify", {
        token,
      });
      return response.statusText === "OK" ? true : false;
    } catch (error) {
      console.log(error.response.data);
      throw error;
    }
};