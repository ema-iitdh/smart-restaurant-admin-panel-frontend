import { Axios } from '@/lib/axiosApi'
import { useQuery } from '@tanstack/react-query'

// Custom hook to fetch food list
export const useFoodList = (token) => {
	return useQuery({
		queryKey: ['food_list'],
		queryFn: async () => {
			const response = await Axios.get('/api/food/foodlist', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		},
		// Enable or disable the query depending on whether the token is available
		enabled: !!token,
		// You can add stale time or cache time as needed
		staleTime: 1000 * 60 * 5, // 5 minutes (optional)
	})
}
