import { Axios } from '@/lib/axiosApi'
import { useQuery } from '@tanstack/react-query'

export const useCategorylist = () => {
	return useQuery({
		queryKey: ['list'],
		queryFn: async () => {
			const response = await Axios.get('/api/category/list')
			return response.data
		},
	})
}
