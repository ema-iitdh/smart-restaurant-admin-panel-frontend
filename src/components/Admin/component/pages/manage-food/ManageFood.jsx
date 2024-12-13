import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SelectRestaurant from '../../SelectRestaurant';
import FoodTable from './food-table';

export default function ManageFood() {
  const [restaurantId, setRestaurantId] = useState(null);
  const [isRestaurantAdmin, setIsRestaurantAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setRestaurantId(user.restaurant);
    setIsRestaurantAdmin(user.role === 'Restaurant_Admin');
  }, []);

  return (
    <div className=' mx-auto w-full px-10'>
      <h1 className='text-2xl font-bold'>Manage Restaurant</h1>
      <Link to='add-food'>
        <Button>Add Food</Button>
      </Link>
      <SelectRestaurant
        isRestaurantAdmin={isRestaurantAdmin}
        restaurantId={restaurantId}
        setRestaurantId={setRestaurantId}
      />
      <FoodTable restaurantId={restaurantId} />
    </div>
  );
}
