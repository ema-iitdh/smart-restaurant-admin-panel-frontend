import { Axios } from "@/lib/axiosApi";

// ! --- Restaurant API ---
// GET ALL RESTAURANT
export const getAllRestaurant = async () => {
	const response = await Axios.get("/api/restaurant/getall");
	return response.data;
};

// Create a new restaurant
export const addRestaurant = async (restaurant) => {
	const response = await Axios.post("/api/restaurant/create", restaurant, {
		headers: {
			"Content-Type": "multipart/form-data",
		},
	});
	return response.data;
};

// DELETE A RESTAURANT
export const deleteRestaurant = async (restaurantId) => {
	const response = await Axios.delete(`/api/restaurant/delete/${restaurantId}`);
	return response.data;
};

// UPDATE A RESTAURANT
export const updateRestaurant = async (restaurantId, restaurant) => {
	const response = await Axios.put(
		`/api/restaurant/update/${restaurantId}`,
		restaurant,
	);
	return response.data;
};

// GET RESTAURANT BY ID
export const getRestaurantById = async (restaurantId) => {
	const response = await Axios.get(`/api/restaurant/getById/${restaurantId}`);
	return response.data;
};
