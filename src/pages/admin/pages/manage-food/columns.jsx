import { deleteRestaurant } from '@/api/apiServices'
import ActionDropdown from '../../component/ui/action-dropdown/ActionDropdown'
import BatchSelect from '../../component/ui/table-ui/batch-select'
import BatchSelectAll from '../../component/ui/table-ui/batch-select-all'
import { DataTableColumnHeader } from '../../component/ui/table-ui/data-table-column-header'
import { Check, CrossIcon } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Cell } from 'recharts'

export const columns = [
	{
		id: 'actions',
		cell: ({ row }) => {
			const food = row.original

			return (
				<ActionDropdown
					editUrl={`/super-admin/manage-food/edit/${food.id}`}
					deleteApiFunction={() => deleteRestaurant(food.id)}
					data={food}
				/>
			)
		},
	},
	{
		id: 'select',
		header: ({ table }) => <BatchSelectAll table={table} />,
		cell: ({ row }) => <BatchSelect row={row} />,
		enableSorting: false,
		enableHiding: false,
	},
	{
		accessorKey: 'image',
		header: ({ column }) => (
			<DataTableColumnHeader
				className={'w-[5rem]'}
				column={column}
				title='Image'
			/>
		),
		cell: ({ row }) => {
			const image = row.getValue('image')
			return (
				<img
					className='object-cover w-[5rem] overflow-hidden h-[5rem] rounded'
					src={image}
					alt='Food'
				/>
			)
		},
		enableSorting: false,
		enableHiding: true,
	},
	{
		accessorKey: 'name',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Name' />
		),
		enableSorting: true,
	},
	{
		accessorKey: 'price',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Price' />
		),
		cell: ({ row }) => {
			const price = row.getValue('price')
			return <span className='font-semibold'>&#8377; {price}</span>
		},
		enableSorting: true,
		enableHiding: true,
	},
	{
		accessorKey: 'isAvailable',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Is Available' />
		),
		cell: ({ row }) => {
			const isAvailable = row.original?.isAvailable
			return (
				<Badge
					variant='outline'
					className={
						isAvailable ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
					}
				>
					{isAvailable ? 'Available' : 'Not Available'}
				</Badge>
			)
		},
	},
	{
		accessorKey: 'todaysSpecial',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Today Special' />
		),
		cell: ({ row }) => {
			const todaysSpecial = row.original?.todaysSpecial
			return (
				<Badge
					variant='outline'
					className={`
							
						${todaysSpecial ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
				>
					{todaysSpecial ? 'Yes' : 'No'}
				</Badge>
			)
		},
	},
	// {
	// 	accessorKey: 'contact.email',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Email' />
	// 	),
	// 	enableSorting: true,
	// 	enableHiding: true,
	// },
	// {
	// 	accessorKey: 'contact.phone',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Phone' />
	// 	),
	// },
	// {
	// 	accessorKey: 'contact.address',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Address' />
	// 	),
	// 	enableSorting: true,
	// 	enableHiding: true,
	// },
	// {
	// 	accessorKey: 'settings.taxPercentage',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Tax Percentage' />
	// 	),
	// 	enableSorting: true,
	// 	enableHiding: true,
	// },
	// {
	// 	accessorKey: 'settings.isActive',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Is Active' />
	// 	),
	// 	cell: ({ row }) => {
	// 		return row.original?.settings?.isActive ? (
	// 			<Badge className='bg-emerald-500 text-white' variant='outline'>
	// 				Active
	// 			</Badge>
	// 		) : (
	// 			<Badge className='bg-red-500 text-white' variant='outline'>
	// 				Inactive
	// 			</Badge>
	// 		)
	// 	},
	// 	enableSorting: true,
	// 	enableHiding: true,
	// },
]
