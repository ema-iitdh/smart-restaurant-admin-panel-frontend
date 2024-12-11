import { Axios } from '@/lib/axiosApi'
import { useQuery } from '@tanstack/react-query'

export const useCategorylist = (restaurantName) => {
	return useQuery({
		queryKey: ['list', restaurantName],
		queryFn: async () => {
			const response = await Axios.get(`/api/category/list/${restaurantName}`)
			return response.data
		},
	})
}

export const useSubCategoryList = (restaurantName, categoryName) => {
	return useQuery({
		queryKey: ['subCategory', restaurantName, categoryName],
		queryFn: async () => {
			const response = await Axios.get(
				`/api/category/list/${restaurantName}/${categoryName}`
			)
			return response.data
		},
		enabled: !!restaurantName && !!categoryName,
	})
}
