import { useQuery } from "@tanstack/react-query";
import { restaurantApi } from "@/api";

export default function useRestaurantById(params = {}, config = {}) {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["restaurant", params.restaurantId],
		queryFn: () => restaurantApi.getRestaurantById(params.restaurantId),
		...config,
	});

	return { data, isLoading, isError };
}
