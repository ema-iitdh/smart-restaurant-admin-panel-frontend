import { Axios } from '@/lib/axiosApi'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { DataTable } from '../ui/data-table'
import { columns, orders } from './columns'
import { Spinner } from 'flowbite-react'
import { socket } from '../socket_io/socket'

export default function Page() {
	const queryClient = useQueryClient()

	useEffect(() => {
		socket.on('send', (payload) => {
			console.log(payload, 'yes')
			queryClient.invalidateQueries({ queryKey: ['order-list'] })
		})
	}, [])

	const { data: orderList, isLoading } = useQuery({
		queryKey: ['order-list'],
		queryFn: async () => {
			const response = await Axios.get('/api/order/list')
			return response.data
		},
	})
	const data = orderList?.orders || []

	if (isLoading) {
		return (
			<div className=' text-center pt-[20%]'>
				<Spinner size='xl' color='failure' />
			</div>
		)
	}
	return (
		<div className=' mx-auto '>
			<DataTable columns={columns} data={data} />
		</div>
	)
}
