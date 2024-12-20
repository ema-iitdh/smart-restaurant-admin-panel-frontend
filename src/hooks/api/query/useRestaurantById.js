import { useQuery } from '@tanstack/react-query'
import { getRestaurantById } from '@/api/apiServices'

export default function useRestaurantById({ restaurantId, isRestaurantAdmin }) {
	const isEnabled = isRestaurantAdmin && restaurantId !== 'null'

	return useQuery({
		queryKey: ['restaurant', restaurantId],
		queryFn: () => getRestaurantById(restaurantId),
		enabled: isEnabled,
	})
}
