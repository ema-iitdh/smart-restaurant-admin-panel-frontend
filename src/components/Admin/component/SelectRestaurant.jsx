import { getAllRestaurant, getRestaurantById } from '@/api/apiServices';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useQuery, useQueryClient } from '@tanstack/react-query';

export default function SelectRestaurant({
  restaurantId,
  setRestaurantId,
  isRestaurantAdmin,
}) {
  // get all restaurant list
  const {
    data: restaurantList,
    isLoading: isRestaurantListLoading,
    isError: isRestaurantListError,
  } = useQuery({
    queryKey: ['restaurants'],
    queryFn: () => getAllRestaurant(),
    enabled: !isRestaurantAdmin,
  });

  const { data: restaurant } = useQuery({
    queryKey: ['restaurant', restaurantId],
    queryFn: () => getRestaurantById(restaurantId),
    enabled: isRestaurantAdmin && restaurantId !== 'null',
  });

  console.log(restaurantId);

  const queryClient = useQueryClient();

  let selectedRestaurant =
    restaurantId === 'null'
      ? { name: 'All Restaurants', _id: 'null' }
      : restaurantList?.restaurants?.find(
          (restaurant) => restaurant._id === restaurantId
        );

  if (isRestaurantAdmin && restaurantId !== 'null') {
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
