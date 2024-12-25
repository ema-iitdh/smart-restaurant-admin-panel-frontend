import { addSubcategory } from '@/api/apiServices'
import { useMutation } from '@tanstack/react-query'

export const useCreatedSubcategory = () => {
	return useMutation({
		mutationFn: ({ subcategories, categoryId, restaurantId }) =>
			addSubcategory({ subcategories, categoryId, restaurantId }),
	})
}
