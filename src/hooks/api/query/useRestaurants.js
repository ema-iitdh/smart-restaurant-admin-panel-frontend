import { useQuery } from '@tanstack/react-query';
import { getAllRestaurant } from '@/api/apiServices';
import useAuth from '@/components/hooks/useAuth';

export default function useRestaurants() {
  const { isRestaurantAdmin } = useAuth();

  const {
    data: restaurants,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getAllRestaurant(),
    enabled: !isRestaurantAdmin,
  });

  return { restaurants, isLoading, isError };
}
