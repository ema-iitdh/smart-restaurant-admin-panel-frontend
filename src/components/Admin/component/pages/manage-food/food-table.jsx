import { useQuery } from '@tanstack/react-query';
import { DataTable } from '../../ui/table-ui/data-table';
import { getFoodListOfARestaurant } from '@/api/apiServices';
import { columns } from './columns';
import TableLoading from '../../ui/table-ui/loading';

export default function FoodTable({ restaurantId }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['foodListOfARestaurant', restaurantId],
    queryFn: () => getFoodListOfARestaurant({ restaurantId }),
  });

  if (isLoading) return <TableLoading />;
  if (isError) return <div>Error</div>;

  const foodListWithId = data?.data?.map((food) => ({
    ...food,
    id: food._id,
  }));

  return <DataTable columns={columns} data={foodListWithId} />;
}
