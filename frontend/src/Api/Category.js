import axios from "axios";

export const readCategories = async (accessToken) => {
	try {
		const response = await axios.get("http://127.0.0.1:8000/api/categories/", {
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

export const readCategory = async (id, accessToken) => {
	try {
		const response = await axios.get(`http://127.0.0.1:8000/api/categories/${id}/`, {
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

export const createCategory = async (data, accessToken) => {
	try {
		const response = await axios.post("http://127.0.0.1:8000/api/categories/", data, {
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

export const deleteCategory = async (id, accessToken) => {
	try {
		const response = await axios.delete(`http://127.0.0.1:8000/api/categories/${id}/`, {
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

export const updateCategory = async (id, data, accessToken) => {
	try {
		const response = await axios.put(`http://127.0.0.1:8000/api/categories/${id}/`, data, {
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
