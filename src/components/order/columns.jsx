import PaymentStatus from './PaymentStatus'
import StatusSelect from './StatusSelect'

export const orders = {
	id: '',
	currentTableNumber: ' ',
	status: '',
	name: '',
	quantity: '',
	price: '',
	totalAmount: '',
}

export const columns = [
	{
		id: 'Table Number',
		accessorKey: 'customerId.currentTableNumber',
		header: 'Table Number',
		cell: (info) => <div className='text-lg'> {info.getValue()} </div>,
	},
	{
		id: 'Status',
		accessorKey: 'status',
		header: 'Status',
		cell: (info) => {
			return (
				<div className='	'>
					<StatusSelect info={info} />
				</div>
			)
		},
	},
	{
		id: 'Food Items',
		accessorKey: 'foodItems',
		header: 'Food Items',
		cell: (info) => {
			const items = info.getValue() || []
			return (
				<ul className='flex flex-col gap-3 text-slate-100 '>
					{items?.map((item, idx) => (
						<li
							key={idx}
							className='border-2 p-[7px] rounded-md border-blue-200 bg-blue-200 text-blue-500 text-center min-w-[130px] drop-shadow-md'
						>
							{item.foodId && item.foodId.name
								? item.foodId.name
								: 'No Name Found'}
						</li>
					))}
				</ul>
			)
		},
	},
	{
		id: 'Quantity',
		accessorKey: 'foodItems',
		header: 'Quantity',
		cell: (info) => {
			const values = info.getValue() || []
			return (
				<ul className='font-medium flex flex-col gap-4 text-lg drop-shadow-md'>
					{values?.map((quantity, idx) => (
						<li key={idx} className='text-green-500 drop-shadow-md text-center'>
							x {quantity.quantity}
						</li>
					))}
				</ul>
			)
		},
	},

	{
		id: 'Price',
		accessorKey: 'foodItems',
		header: 'Price',
		cell: (info) => {
			const items = info.getValue() || []
			console.log(items)
			return (
				<ul className='flex flex-col gap-[22px] text-slate-100 '>
					{items?.map((item, idx) => (
						<li
							key={idx}
							className=' bg-slate-200 px-[7px] py-[7px] text-md text-muted  rounded-md font-medium text-center min-w-[100px] drop-shadow-md'
						>
							₹ {item.foodId.price} /-
						</li>
					))}
				</ul>
			)
		},
	},
	{
		id: 'Total Amount',
		accessorKey: 'totalAmount',
		header: 'Total Amount',
		cell: (info) => (
			<div className='text-lg drop-shadow-md text-orange-500 min-w-[100px]  text-center                                 '>
				₹ {info.getValue()} /-
			</div>
		),
	},
	{
		id: 'Payment',
		accessorKey: 'payment',
		header: 'Payment',
		cell: (info) => (
			<div className='text-slate-500'>
				<PaymentStatus info={info} />
			</div>
		),
	},
	{
		id: 'payment mode',
		accessorKey: 'payment_mode',
		header: 'Payment Mode',
		cell: (info) => (
			<div
				className={`${
					info.getValue() === 'Online'
						? 'text-green-500 text-lg drop-shadow-md'
						: 'text-red-500 text-lg drop-shadow-md'
				}`}
			>
				{info.getValue()}
			</div>
		),
	},
]
