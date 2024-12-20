import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SelectRestaurant from '../../component/SelectRestaurant'
import FoodTable from './food-table'

export default function ManageFood() {
	const [restaurantId, setRestaurantId] = useState(null)
	const [isRestaurantAdmin, setIsRestaurantAdmin] = useState(false)

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'))
		setRestaurantId(user.restaurant)
		setIsRestaurantAdmin(user.role === 'Restaurant_Admin')
	}, [])

	return (
		<div className=''>
			<div className='container mx-auto px-4 sm:px-6 lg:px-8 py-3'>
				<div className='bg-white rounded-xl shadow-sm p-6 mb-6'>
					<div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8'>
						<h1 className='text-3xl font-bold text-gray-800'>
							Manage Food Items
						</h1>
						<Link to='add-food'>
							<Button className='bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-lg transition-colors'>
								<span className='mr-2'>+</span>
								Add New Food
							</Button>
						</Link>
					</div>
					<div className='max-w-xl'>
						<SelectRestaurant
							isRestaurantAdmin={isRestaurantAdmin}
							restaurantId={restaurantId}
							setRestaurantId={setRestaurantId}
							className='w-full rounded-lg border-gray-200 focus:ring-2 focus:ring-primary/20'
						/>
					</div>
				</div>

				<div className='bg-white rounded-xl shadow-sm overflow-hidden p-2'>
					<FoodTable restaurantId={restaurantId} />
				</div>
			</div>
		</div>
	)
}
