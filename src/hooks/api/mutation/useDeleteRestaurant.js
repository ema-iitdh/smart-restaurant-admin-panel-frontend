import { useMutation, useQueryClient } from "@tanstack/react-query";
import { restaurantApi } from "@/api";
import { toast } from "react-toastify";

export default function useDeleteRestaurant(params = {}, config = {}) {
	const queryClient = useQueryClient();
	const {
		mutate: deleteRestaurantMutation,
		isLoading,
		isError,
	} = useMutation({
		mutationFn: (restaurantId) => restaurantApi.deleteRestaurant(restaurantId),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["restaurants"] });
			toast.success("Restaurant deleted successfully");
		},
		onError: (error) => {
			toast.error(error.message);
		},
		...config,
	});

	return { deleteRestaurantMutation, isLoading, isError };
}
