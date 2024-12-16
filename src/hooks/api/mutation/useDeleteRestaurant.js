import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRestaurant } from '@/api/apiServices';
import { toast } from 'react-toastify';

export default function useDeleteRestaurant() {
  const queryClient = useQueryClient();
  const {
    mutate: deleteRestaurantMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (restaurantId) => deleteRestaurant(restaurantId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
      toast.success('Restaurant deleted successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteRestaurantMutation, isLoading, isError };
}
