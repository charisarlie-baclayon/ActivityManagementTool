import axios from "axios";

export const readTemplates = async (accessToken) => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/templates/", {
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

export const readTemplate = async (id, accessToken) => {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/api/templates/${id}/`, {
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

export const createTemplate = async (data, accessToken) => {
	try {
		const response = await axios.post("http://127.0.0.1:8000/api/templates/", data, {
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

export const deleteTemplate = async (id, accessToken) => {
	try {
		const response = await axios.delete(`http://127.0.0.1:8000/api/templates/${id}/`, {
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

export const updateTemplate = async (id, data, accessToken) => {
	try {
		const response = await axios.put(`http://127.0.0.1:8000/api/templates/${id}/`, data, {
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
