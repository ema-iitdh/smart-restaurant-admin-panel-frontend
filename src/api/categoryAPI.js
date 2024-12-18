// ! --- Category API ---

import { Axios } from "@/lib/axiosApi";

// Create a new category
export const addCategory = async (restaurantId, category) => {
	const response = await Axios.post(
		`/api/category/create/category/${restaurantId}`,
		category,
	);
	return response.data;
};

// Create sub category of a category
export const addSubCategory = async (
	restaurantId,
	subCategoriesWithCategoryId,
) => {
	const response = await Axios.post(
		`/api/category/create/subcategory/${restaurantId}`,
		subCategoriesWithCategoryId,
	);
	return response.data;
};

// GET ALL CATEGORY FROM A RESTAURANT
export const getAllCategory = async (restaurantId) => {
	const response = await Axios.get(`/api/category/list/${restaurantId}`);
	return response.data;
};

// DELETE A CATEGORY FROM A RESTAURANT
export const deleteCategory = async (restaurantId, categoryId) => {
	const response = await Axios.delete(
		`/api/category/delete/${restaurantId}/${categoryId}`,
	);
	return response.data;
};

// DELETE A SUB CATEGORY FROM A RESTAURANT
export const deleteSubCategory = async (
	restaurantId,
	categoryId,
	subcategoryName,
) => {
	const response = await Axios.delete(
		`/api/category/delete/subcategory/${restaurantId}/${categoryId}/${subcategoryName}`,
	);
	return response.data;
};

// Update a sub category
export const updateSubCategory = async (
	restaurantId,
	categoryId,
	newSubCategoryName,
	oldSubCategoryName,
) => {
	const response = await Axios.put(
		`/api/category/update/subcategory/${restaurantId}/${categoryId}/${oldSubCategoryName}`,
		newSubCategoryName,
	);
	return response.data;
};

// GET ALL SUB CATEGORY FROM A CATEGORY
export const getAllSubCategory = async (restaurantId, categoryId) => {
	const response = await Axios.get(
		`/api/category/list/${restaurantId}/${categoryId}`,
	);
	return response.data;
};
