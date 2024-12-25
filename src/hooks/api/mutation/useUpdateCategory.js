import { updateCategory } from '@/api/apiServices'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ values, categoryId, restaurantId }) =>
			updateCategory({ values, categoryId, restaurantId }),

		onSuccess: (data) => {
			console.log('Mutation successful:', data)
			toast.success(data.message || 'Category updated successfully!')
			queryClient.invalidateQueries({ queryKey: ['categories'] })
		},

		onError: (error) => {
			console.error('Mutation error:', error.response?.data || error.message)
			toast.error('Failed to update category.')
		},
	})
}
