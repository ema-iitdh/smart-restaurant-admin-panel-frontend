import useAuth from '@/components/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { ROLES } from '@/constants/ROLES';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import SelectRestaurant from '../../SelectRestaurant';
import FoodTable from './food-table';

export default function ManageFood() {
  const [restaurantId, setRestaurantId] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.role === ROLES.RESTAURANT_ADMIN) {
      setRestaurantId(user?.restaurant);
    }
  }, [user]);

  return (
    <div className=' mx-auto w-full px-10'>
      <h1 className='text-2xl font-bold'>Manage Food</h1>
      <Link to='add-food'>
        <Button>Add Food</Button>
      </Link>
      <SelectRestaurant
        isRestaurantAdmin={user?.role === ROLES.RESTAURANT_ADMIN}
        restaurantId={restaurantId}
        setRestaurantId={setRestaurantId}
      />
      <FoodTable restaurantId={restaurantId} />
    </div>
  );
}
