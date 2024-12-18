import { restaurantApi } from '@/api';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useRestaurantById from '@/hooks/api/query/useRestaurantById';
import useRestaurants from '@/hooks/api/query/useRestaurants';

import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function SelectRestaurant({
  restaurantId,
  setRestaurantId,
  isRestaurantAdmin,
}) {
  const {
    restaurants: restaurantList,
    isLoading: isRestaurantListLoading,
    isError: isRestaurantListError,
  } = useRestaurants({}, { enabled: !isRestaurantAdmin });

  const { data: restaurant, isLoading: isRestaurantLoading } =
    useRestaurantById(
      { restaurantId },
      {
        onSuccess: (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
        enabled: isRestaurantAdmin && restaurantId !== 'null',
      }
    );

  const queryClient = useQueryClient();

  if (isRestaurantLoading) {
    return <div>Loading...</div>;
  }

  let selectedRestaurant =
    restaurantId === 'null'
      ? { name: 'All Restaurants', _id: 'null' }
      : restaurantList?.restaurants?.find(
          (restaurant) => restaurant._id === restaurantId
        );

  if (isRestaurantAdmin && restaurantId !== 'null') {
    console.log(selectedRestaurant, restaurant);
    selectedRestaurant = restaurant?.restaurant;
  }

  if (isRestaurantAdmin) {
    return (
      <h2 className='text-2xl font-bold text-gray-800 py-2 text-center'>
        {selectedRestaurant?.name}
      </h2>
    );
  }

  return (
    <>
      {!isRestaurantAdmin && isRestaurantListError && (
        <div className='text-red-500'>Error loading restaurant list</div>
      )}
      <Select
        onValueChange={(value) => {
          setRestaurantId(value);
          queryClient.invalidateQueries({
            queryKey: ['foodListOfARestaurant', value],
          });
        }}
        disabled={
          isRestaurantListLoading || isRestaurantListError || isRestaurantAdmin
        }
      >
        <SelectTrigger className='w-[180px]'>
          <SelectValue
            placeholder={
              isRestaurantListLoading
                ? 'Loading...'
                : selectedRestaurant?.name || 'Select Restaurant'
            }
          />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value='null'>All Restaurants</SelectItem>
          {restaurantList?.restaurants?.map((restaurant) => (
            <SelectItem key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}
