import { addCategory } from '@/api/apiServices'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'

export const useCreateCategory = () => {
	return useMutation({
		mutationFn: ({ category, restaurantId }) =>
			addCategory({ category, restaurantId }),
	})
}
