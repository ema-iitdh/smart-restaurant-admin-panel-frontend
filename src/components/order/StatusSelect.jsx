import React, { useState } from 'react'
import { socket } from '../socket_io/socket'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'

export default function StatusSelect({ info }) {
	console.log(info)
	const [selectStatus, setSelectStatus] = useState(
		info.getValue() || 'Processing'
	)
	// updated status sending to client
	const handleStatusChange = (newStatus) => {
		console.log('New Status ', newStatus)
		setSelectStatus(newStatus)
		socket.emit('updateOrderStatus', {
			orderId: info.row.original._id,
			newStatus,
			customerId: info.row.original.customerId._id,
		})
	}
	console.log(' current Status', selectStatus)

	return (
		<Select value={selectStatus} onValueChange={handleStatusChange}>
			<SelectTrigger>
				<SelectValue placeholder={selectStatus} className='text-slate-500'>
					{selectStatus}
				</SelectValue>
			</SelectTrigger>
			<SelectContent>
				<SelectItem value='Preparing'>
					<span className='text-orange-500 font-medium drop-shadow-md'>
						Preparing
					</span>
				</SelectItem>
				<SelectItem value='Ready'>
					<span className='text-yellow-400 font-medium drop-shadow-md'>
						Ready
					</span>
				</SelectItem>
				<SelectItem value='Completed'>
					{' '}
					<span className='text-green-500  font-medium drop-shadow-md'>
						Completed
					</span>
				</SelectItem>
			</SelectContent>
		</Select>
	)
}
