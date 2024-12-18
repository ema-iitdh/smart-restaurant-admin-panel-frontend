import { useQuery } from "@tanstack/react-query";
import { restaurantApi } from "@/api";
import useAuth from "@/components/hooks/useAuth";

export default function useRestaurants(params = {}, config = {}) {
	const { isRestaurantAdmin } = useAuth();

	const {
		data: restaurants,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["restaurants"],
		queryFn: () => restaurantApi.getAllRestaurant(),
		enabled: !isRestaurantAdmin,
		...config,
	});

	return { restaurants, isLoading, isError };
}
