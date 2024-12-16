import useFoods from '@/hooks/api/query/useFoods';
import { DataTable } from '../../ui/table-ui/data-table';
import TableLoading from '../../ui/table-ui/loading';
import { columns } from './columns';

export default function FoodTable({ restaurantId }) {
  const { foods, isLoading, isError } = useFoods({ restaurantId });

  if (isLoading) return <TableLoading />;
  if (isError) return <div>Error</div>;

  const foodListWithId = foods?.data?.map((food) => ({
    ...food,
    id: food._id,
  }));

  return <DataTable columns={columns} data={foodListWithId} />;
}
