import { Axios } from '@/lib/axiosApi'

// delete a restaurant
export const deleteRestaurant = async (restaurantId) => {
	const response = await Axios.delete(`/api/restaurant/delete/${restaurantId}`)
	return response.data
}

export const getAllRestaurant = async () => {
	const response = await Axios.get('/api/restaurant/getall')
	return response.data
}

// add a restaurant
export const addRestaurant = async (restaurant) => {
	const response = await Axios.post('/api/restaurant/create', restaurant, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	})
	return response.data
}

// get all food
export const getFoodListOfAllRestaurant = async ({ restaurantId }) => {
	const response = await Axios.get(`/api/food/foodList/${restaurantId}`)
	return response.data
}

export const logout = async () => {
	const response = await Axios.get('/api/admin/logout')
	return response.data
}

export const getRestaurantById = async (restaurantId) => {
	const response = await Axios.get(`/api/restaurant/getById/${restaurantId}`)
	return response.data
}

export const login = async (values) => {
	const response = await Axios.post('/api/admin/login', values, {
		headers: {
			'Content-Type': 'application/json',
		},
		withCredentials: true,
	})

	return response.data
}
export const getAllRestaurantAdmin = async () => {
	const response = await Axios.get('/api/admin/allAdmin')
	return response.data
}

export const handleAddPermission = async (values, userId) => {
	const response = await Axios.post(
		`/api/admin/addPermissions/${userId}`,
		values
	)
	return response.data
}
export const getAllPermission = async (userId) => {
	const response = await Axios.get(`/api/admin/getPermissions/${userId}`)
	return response.data
}
export const updatePermission = async (values, userId) => {
	if (!userId) {
		throw new Error('User ID is required')
	}
	const response = await Axios.put(
		`/api/admin/updatePermissions/${userId}`,
		values
	)
	return response.data
}

export const deletePermission = async ({ userId, permissionIds }) => {
	if (!userId || !Array.isArray(permissionIds)) {
		throw new Error(
			'Invalid data: userId or permissionIds are missing or not an array.'
		)
	}

	try {
		const response = await Axios.delete(
			`/api/admin/deletePermissions/${userId}`,
			{
				data: { permissionIds }, // Send permissionIds in the request body
			}
		)

		return response.data
	} catch (error) {
		console.error('Error deleting permissions:', error)
		throw new Error(
			error.response ? error.response.data.message : 'Unknown error'
		)
	}
}

export const getAllCategories = async (restaurantId) => {
	const response = await Axios.get(`api/category/list/${restaurantId}`)
	return response.data
}
