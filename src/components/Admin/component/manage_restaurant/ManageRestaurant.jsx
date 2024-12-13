import { Link } from 'react-router-dom';
import { columns } from './columns';
import { DataTable } from '../ui/table-ui/data-table';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { getAllRestaurant } from '@/api/apiServices';

export default function ManageRestaurant() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['restaurants'],
    queryFn: getAllRestaurant,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching data</div>;

  // replace all _id with id
  const restaurantsWithId = data.restaurants.map((restaurant) => ({
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
