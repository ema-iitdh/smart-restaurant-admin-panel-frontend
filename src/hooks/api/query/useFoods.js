import { useQuery } from "@tanstack/react-query";
import { foodApi } from "@/api";

export default function useFoods(params = {}, config = {}) {
	const {
		data: foods,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["foods", params.restaurantId],
		queryFn: () => foodApi.getFoodListOfARestaurant(params.restaurantId),
		...config,
	});

	return { foods, isLoading, isError };
}
