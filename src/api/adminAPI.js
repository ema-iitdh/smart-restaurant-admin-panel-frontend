import { Axios } from "@/lib/axiosApi";

// ! --- Admin API ---

// Create a new admin
export const createAdmin = async (admin) => {
	const response = await Axios.post("/api/admin/signup", admin);
	return response.data;
};

// get all admin
export const getAllAdmin = async () => {
	const response = await Axios.get("/api/admin/allAdmin");
	return response.data;
};

// GET ADMIN Permissions
export const getAdminPermissions = async (adminId) => {
	const response = await Axios.get(`/api/admin/getPermissions/${adminId}`);
	return response.data;
};

// DELETE ADMIN Permissions
export const deleteAdminPermissions = async (adminId, permissionIds) => {
	const response = await Axios.delete(
		`/api/admin/deletePermissions/${adminId}`,
		{
			data: { permissionIds },
		},
	);
	return response.data;
};

// Update Admin Permissions
export const updateAdminPermissions = async (adminId, permissions) => {
	const response = await Axios.put(`/api/admin/updatePermissions/${adminId}`, {
		permissions,
	});
	return response.data;
};

// Add Admin Permissions
export const addAdminPermissions = async (adminId, permissions) => {
	const response = await Axios.post(`/api/admin/addPermissions/${adminId}`, {
		permissions,
	});
	return response.data;
};

// GET ADMIN BY ID
export const getAdminById = async (adminId) => {
	const response = await Axios.get(`/api/admin/getAdmin/${adminId}`);
	return response.data;
};
