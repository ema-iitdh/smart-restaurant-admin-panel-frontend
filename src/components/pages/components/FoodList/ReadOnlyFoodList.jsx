import { Button } from '@/components/ui/button'
import { url } from '@/lib/axiosApi'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Spinner, Table } from 'flowbite-react'
import { DeleteIcon, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ReadOnlyFoodList({
	adminFoodList,
	isPending,
	handleDelete,
}) {
	return (
		<Table.Body className='divide-y p-1 '>
			<Table.Row className='text-sm'>
				<Table.Cell>
					<img
						className='rounded-md shadow-md'
						src={adminFoodList.image}
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
						<Button className='drop-shadow-md p-[12px] bg-customGreen hover:bg-green-500'>
							<div className='flex items-center gap-2 '>
								Edit
								<FontAwesomeIcon icon={faPenToSquare} />
							</div>
						</Button>
					</Link>
				</Table.Cell>
				<Table.Cell>
					<Button
						onClick={() => handleDelete(adminFoodList._id)}
						disabled={isPending === adminFoodList._id}
						className='drop-shadow-md bg-customRed hover:bg-red-500'
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
