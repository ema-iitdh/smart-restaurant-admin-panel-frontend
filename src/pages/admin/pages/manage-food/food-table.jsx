import useFoods from '@/hooks/api/query/useFoods'
import { DataTable } from '../../component/ui/table-ui/data-table'
import TableLoading from '../../component/ui/table-ui/loading'
import { columns } from './columns'

export default function FoodTable({ restaurantId }) {
	const { foods, isLoading, isError } = useFoods({ restaurantId })

	if (isLoading)
		return (
			<div className='pt-5'>
				<TableLoading />
			</div>
		)
	if (isError) return <div>Error</div>

	const foodListWithId = foods?.data?.map((food) => ({
		...food,
		id: food._id,
	}))
	console.log('foods	', foodListWithId)

	return <DataTable columns={columns} data={foodListWithId} />
}
