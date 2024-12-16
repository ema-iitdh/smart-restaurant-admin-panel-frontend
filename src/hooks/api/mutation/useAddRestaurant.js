import { useMutation } from '@tanstack/react-query';
import { addRestaurant } from '@/api/apiServices';

export default function useAddRestaurant() {
  const {
    mutate: addRestaurantMutation,
    isLoading,
    isError,
  } = useMutation({
    mutationFn: (restaurant) => addRestaurant(restaurant),
    onSuccess: () => {
      toast.success('Restaurant added successfully');
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addRestaurantMutation, isLoading, isError };
}
