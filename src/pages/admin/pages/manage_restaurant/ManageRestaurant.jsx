import { Link } from 'react-router-dom'
import { columns } from './columns'
import { DataTable } from '../../component/ui/table-ui/data-table'
import { Button } from '@/components/ui/button'
import { useQuery } from '@tanstack/react-query'
import { getAllRestaurant } from '@/api/apiServices'

export default function ManageRestaurant() {
	const { data, isLoading, isError } = useQuery({
		queryKey: ['restaurants'],
		queryFn: getAllRestaurant,
	})

	if (isLoading) return <div>Loading...</div>
	if (isError) return <div>Error fetching data</div>

	// replace all _id with id
	const restaurantsWithId = data.restaurants.map((restaurant) => ({
		...restaurant,
		id: restaurant._id,
	}))

	return (
		<div className='container mx-auto p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-3xl font-semibold text-gray-800'>
					Manage Restaurant
				</h1>
				<Link to='add-restaurant'>
					<Button className='bg-blue-500 text-white hover:bg-blue-600'>
						Add Restaurant
					</Button>
				</Link>
			</div>
			<div className='bg-white shadow-md rounded-lg p-4'>
				<DataTable columns={columns} data={restaurantsWithId} />
			</div>
		</div>
	)
}
