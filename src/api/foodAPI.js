import { Axios } from '@/lib/axiosApi';

// ! --- Food API ---

// Create a new food
export const addFood = async (restaurantId, food) => {
  const response = await Axios.post(`/api/food/upload/${restaurantId}`, food);
  return response.data;
};

// UPDATE A FOOD
export const updateFood = async (restaurantId, foodId, food) => {
  const response = await Axios.put(
    `/api/food/edit/${restaurantId}/${foodId}`,
    food
  );
  return response.data;
};

// SEARCH FOOD
// TODO: add search params in backend (Now handled in frontend with react-table)
export const searchFood = async (restaurantId, search) => {
  const response = await Axios.get(`/api/food/search/${restaurantId}`, {
    params: { search },
  });
  return response.data;
};

// SEARCH FOOD FROM ALL RESTAURANT
export const searchFoodFromAllRestaurant = async (foodName) => {
  const response = await Axios.get('/api/food/find', {
    params: { foodName },
  });
  return response.data;
};

// GET ALL FOOD FROM A RESTAURANT
export const getFoodListOfARestaurant = async (restaurantId) => {
  const response = await Axios.get(`/api/food/foodList/${restaurantId}`);
  return response.data;
};

// DELETE A FOOD FROM A RESTAURANT
export const deleteFood = async (restaurantId, foodId) => {
  const response = await Axios.delete(
    `/api/food/delete/${restaurantId}/${foodId}`
  );
  return response.data;
};

// GET FOOD BY ID
export const getFoodById = async (restaurantId, foodId) => {
  const response = await Axios.get(
    `/api/food/getFood/${restaurantId}/${foodId}`
  );
  return response.data;
};
