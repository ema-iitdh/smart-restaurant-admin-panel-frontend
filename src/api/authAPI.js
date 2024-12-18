import { Axios } from "@/lib/axiosApi";

// Login admin
export const login = async (values) => {
	const response = await Axios.post("/api/admin/login", values, {
		headers: {
			"Content-Type": "application/json",
		},
		withCredentials: true,
	});

	return response.data;
};

// Logout admin
export const logout = async () => {
	const response = await Axios.get("/api/admin/logout");
	return response.data;
};
