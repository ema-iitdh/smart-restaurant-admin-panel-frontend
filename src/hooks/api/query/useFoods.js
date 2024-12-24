import { getFoodListOfAllRestaurant } from '@/api/apiServices'
import { useQuery } from '@tanstack/react-query'

export default function useFoods({ restaurantId }) {
	const {
		data: foods,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['foods', restaurantId],
		queryFn: () => getFoodListOfAllRestaurant({ restaurantId }),
	})

	return { foods, isLoading, isError }
}
