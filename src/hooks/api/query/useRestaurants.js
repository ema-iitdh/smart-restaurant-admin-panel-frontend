import { useQuery } from '@tanstack/react-query'
import { getAllRestaurant } from '@/api/apiServices'
import useAuth from '@/components/hooks/useAuth'

export default function useRestaurants() {
	const { isRestaurantAdmin } = useAuth()

	return useQuery({
		queryKey: ['restaurants'],
		queryFn: getAllRestaurant,
		enabled: !isRestaurantAdmin, // The query will only run if the user is not a restaurant admin
	})
}
