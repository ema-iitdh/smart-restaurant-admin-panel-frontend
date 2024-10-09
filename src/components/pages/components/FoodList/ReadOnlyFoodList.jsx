import { url } from '@/lib/axiosApi'
import { Button, Spinner, Table } from 'flowbite-react'
import { DeleteIcon, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ReadOnlyFoodList({
	adminFoodList,
	isPending,
	handleDelete,
}) {
	const driveImage = `https://drive.google.com/thumbnail?id=${adminFoodList.image}&sz=wP1000-h1000
`
	console.log(driveImage)
	return (
		<Table.Body className='divide-y p-1 '>
			<Table.Row className='text-sm'>
				<Table.Cell>
					<img
						className='w-20 h-20  rounded-md shadow-md'
						src={driveImage}
						width={30}
						height={30}
						// src={adminFoodList.image}
					/>
				</Table.Cell>
				<Table.Cell className='whitespace-nowrap font-medium text-muted '>
					{adminFoodList.name}
				</Table.Cell>
				<Table.Cell className='font-medium text-red-700 min-w-[100px] '>
					₹ {adminFoodList.price}
				</Table.Cell>
				<Table.Cell className='font-medium text-muted'>
					{adminFoodList.category}
				</Table.Cell>
				<Table.Cell>
					<Link to={`/update/${adminFoodList._id}`}>
						<Button color='blue' className='drop-shadow-md'>
							<div className='flex gap-3 '>
								<Pencil color=' white ' size={20} />
								Edit
							</div>
						</Button>
					</Link>
				</Table.Cell>
				<Table.Cell>
					<Button
						onClick={() => handleDelete(adminFoodList._id)}
						disabled={isPending === adminFoodList._id}
						color='failure'
						className='drop-shadow-md'
					>
						{isPending === adminFoodList._id ? (
							<Spinner color='warning' size='sm' />
						) : (
							<Trash2 size={20} />
						)}
					</Button>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	)
}
