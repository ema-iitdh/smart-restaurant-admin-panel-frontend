import useAuth from '@/components/hooks/useAuth'
import useGetALlCategories from '@/hooks/api/query/useGetALlCategories'
import { DataTable } from '../../component/ui/table-ui/data-table'
import { columns } from './columns'
import TableLoading from '../../component/ui/table-ui/loading'

export default function CategoryTable() {
	const { user } = useAuth()
	const restaurantId = user?.restaurant
	const { data, isLoading } = useGetALlCategories(restaurantId)
	console.log('data: ', data?.categories)

	if (isLoading) {
		return (
			<div className='flex items-center justify-center min-h-[400px]'>
				<TableLoading />
			</div>
		)
	}
	return <DataTable columns={columns} data={data?.categories ?? []} />
}
