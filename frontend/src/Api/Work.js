import axios from "axios";

export const readWorks = async (accessToken) => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/works/", {
			headers: {
				//Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data);
		throw error;
	}
};

export const readWork = async (id, accessToken) => {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/api/works/${id}/`, {
			headers: {
				//Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data);
		throw error;
	}
};

export const createWork = async (data, accessToken) => {
	try {
		const response = await axios.post("http://127.0.0.1:8000/api/works/", data, {
			headers: {
				//Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data);
		throw error;
	}
};

export const deleteWork = async (id, accessToken) => {
	try {
		const response = await axios.delete(`http://127.0.0.1:8000/api/works/${id}/`, {
			headers: {
				//Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data);
		throw error;
	}
};

export const updateWork = async (id, data, accessToken) => {
	try {
		const response = await axios.put(`http://127.0.0.1:8000/api/works/${id}/`, data, {
			headers: {
				//Authorization: `Bearer ${accessToken}`,
			},
		});
		return response.data;
	} catch (error) {
		console.log(error.response.data);
		throw error;
	}
};
