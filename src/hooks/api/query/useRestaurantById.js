import { useQuery } from '@tanstack/react-query';
import { getRestaurantById } from '@/api/apiServices';

export default function useRestaurantById({ restaurantId }) {
  const {
    data: restaurant,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurantById(restaurantId),
  });

  return { restaurant, isLoading, isError };
}
