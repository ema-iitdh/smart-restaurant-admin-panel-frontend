import { useQuery } from '@tanstack/react-query';
import { getFoodListOfARestaurant } from '@/api/apiServices';

export default function useFoods({ restaurantId }) {
  const {
    data: foods,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['foods', restaurantId],
    queryFn: () => getFoodListOfARestaurant({ restaurantId }),
  });

  return { foods, isLoading, isError };
}
