import { Button } from '@/components/ui/button';
import useRestaurants from '@/hooks/api/query/useRestaurants';
import { Link } from 'react-router-dom';
import { DataTable } from '../ui/table-ui/data-table';
import { columns } from './columns';

export default function ManageRestaurant() {
  const { restaurants, isLoading, isError } = useRestaurants();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // replace all _id with id
  const restaurantsWithId = restaurants.restaurants.map((restaurant) => ({
    ...restaurant,
    id: restaurant._id,
  }));

  return (
    <div className=' mx-auto w-full px-10'>
      <h1 className='text-2xl font-bold'>Manage Restaurant</h1>
      <Link to='add-restaurant'>
        <Button>Add Restaurant</Button>
      </Link>
      <DataTable columns={columns} data={restaurantsWithId} />
    </div>
  );
}
