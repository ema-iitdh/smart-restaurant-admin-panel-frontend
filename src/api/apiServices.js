import { Axios } from '@/lib/axiosApi';

// delete a restaurant
export const deleteRestaurant = async (restaurantId) => {
  const response = await Axios.delete(`/api/restaurant/delete/${restaurantId}`);
  return response.data;
};

export const getAllRestaurant = async () => {
  const response = await Axios.get('/api/restaurant/getall');
  return response.data;
};

// add a restaurant
export const addRestaurant = async (restaurant) => {
  const response = await Axios.post('/api/restaurant/create', restaurant, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

// get all food
export const getFoodListOfARestaurant = async ({ restaurantId }) => {
  const response = await Axios.get(`/api/food/foodList/${restaurantId}`);
  return response.data;
};

export const logout = async () => {
  const response = await Axios.get('/api/admin/logout');
  return response.data;
};

export const getRestaurantById = async (restaurantId) => {
  const response = await Axios.get(`/api/restaurant/getById/${restaurantId}`);
  return response.data;
};

export const login = async (values) => {
  const response = await Axios.post('/api/admin/login', values, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });

  return response.data;
};
