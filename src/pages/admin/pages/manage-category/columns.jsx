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
			const category = row.original
			return (
				<ActionDropdown
					editUrl={`update-category/${category.restaurant}/${category._id}`}
					deleteApiFunction={() => deleteCategory(category.id)}
					data={category}
				/>
			)
		},
	},
	{
		accessorKey: 'category',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Category' />
		),
		cell: ({ row }) => {
			const category = row.getValue('category')
			return <span className='tracking-wide font-semibold'>{category}</span>
		},
		enableSorting: true,
	},
	{
		accessorKey: 'subcategory',
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title='Sub-Category' />
		),
		cell: ({ row }) => {
			// Changed from Cell to cell
			const subcategory = row.getValue('subcategory')

			return (
				<div className='flex flex-wrap gap-1'>
					{subcategory?.map((sub, index) => (
						<Badge
							key={index}
							variant='secondary'
							className='px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full'
						>
							{sub}
						</Badge>
					))}
				</div>
			)
		},
	},
	// 	enableSorting: true,
	// },
	// 	id: 'actions',
	// 	cell: ({ row }) => {

	// },
	// {
	// 	id: 'select',
	// 	header: ({ table }) => <BatchSelectAll table={table} />,
	// 	cell: ({ row }) => <BatchSelect row={row} />,
	// 	enableSorting: false,
	// 	enableHiding: false,
	// },
	// {
	// 	accessorKey: 'image',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader
	// 			className={'w-[5rem]'}
	// 			column={column}
	// 			title='Image'
	// 		/>
	// 	),
	// 	cell: ({ row }) => {
	// 		const image = row.getValue('image')
	// 		return (
	// 			<img
	// 				className='object-cover w-[5rem] overflow-hidden h-[5rem] rounded'
	// 				src={image}
	// 				alt='Food'
	// 			/>
	// 		)
	// 	},
	// 	enableSorting: false,
	// 	enableHiding: true,
	// },
	// {
	// 	accessorKey: 'name',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Name' />
	// 	),
	// 	enableSorting: true,
	// },
	// {
	// 	accessorKey: 'price',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Price' />
	// 	),
	// 	cell: ({ row }) => {
	// 		const price = row.getValue('price')
	// 		return <span className='font-semibold'>&#8377; {price}</span>
	// 	},
	// 	enableSorting: true,
	// 	enableHiding: true,
	// },
	// {
	// 	accessorKey: 'isAvailable',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Is Available' />
	// 	),
	// 	cell: ({ row }) => {
	// 		const isAvailable = row.original?.isAvailable
	// 		return (
	// 			<Badge
	// 				variant='outline'
	// 				className={
	// 					isAvailable ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
	// 				}
	// 			>
	// 				{isAvailable ? 'Available' : 'Not Available'}
	// 			</Badge>
	// 		)
	// 	},
	// },
	// {
	// 	accessorKey: 'todaysSpecial',
	// 	header: ({ column }) => (
	// 		<DataTableColumnHeader column={column} title='Today Special' />
	// 	),
	// 	cell: ({ row }) => {
	// 		const todaysSpecial = row.original?.todaysSpecial
	// 		return (
	// 			<Badge
	// 				variant='outline'
	// 				className={`

	// 					${todaysSpecial ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}
	// 			>
	// 				{todaysSpecial ? 'Yes' : 'No'}
	// 			</Badge>
	// 		)
	// 	},
	// },
]
