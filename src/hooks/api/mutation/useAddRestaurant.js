import { useMutation } from "@tanstack/react-query";
import { restaurantApi } from "@/api";
import { toast } from "react-toastify";

export default function useAddRestaurant(params = {}, config = {}) {
	const {
		mutate: addRestaurantMutation,
		isLoading,
		isError,
	} = useMutation({
		mutationFn: (restaurant) => restaurantApi.addRestaurant(restaurant),
		onSuccess: () => {
			toast.success("Restaurant added successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
		...config,
	});

	return { addRestaurantMutation, isLoading, isError };
}
