import React, { useEffect, useState } from 'react'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../ui/select'
import { socket } from '../socket_io/socket'

export default function PaymentStatus({ info }) {
	const [status, setStatus] = useState(info.getValue() || 'Unpaid')
	useEffect(() => {
		console.log('Intial status', status)
	}, [status])

	const paymentColor = `${
		status === 'Unpaid'
			? 'text-red-700  p-2 bg-red-200 rounded-md  drop-shadow-md'
			: 'text-green-500  p-2 rounded-md drop-shadow-md '
	}`
	const handlePaymentStatus = (paid) => {
		console.log('payment Status', paid)
		setStatus(paid)
		socket.emit('updatePaymentStatus', {
			orderId: info.row.original._id,
			customerId: info.row.original.customerId._id,
			paid,
		})
	}
	return (
		<div>
			<Select value={status} onValueChange={handlePaymentStatus}>
				<SelectTrigger className={`${paymentColor} w-[120px] `}>
					<SelectValue>{status}</SelectValue>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value='Paid'>
						<p className='font-medium drop-shadow-md text-green-400'> Paid </p>
					</SelectItem>
				</SelectContent>
			</Select>
		</div>
	)
}
