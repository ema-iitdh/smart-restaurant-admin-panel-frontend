import { Axios, url } from '@/lib/axiosApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Delete, DeleteIcon, FlameKindlingIcon, Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FadeLoader } from 'react-spinners'
import { set } from 'zod'
import { Button, Spinner, Table } from 'flowbite-react'
import useAuth from '@/components/hooks/useAuth'
import { Link, useParams } from 'react-router-dom'
import ReadOnlyFoodList from './ReadOnlyFoodList'

const FoodList = () => {
	const [loadingId, setLoadingId] = useState(null)
	const { token } = useAuth()
	const queryClient = useQueryClient()
	const {
		data: foodList,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ['food_list'],
		queryFn: async () => {
			const response = await Axios.get('/api/food/foodList', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		},
	})
	const { mutate: deleteFoodId, isPending: isDeletPending } = useMutation({
		mutationKey: ['DeleteFood'],
		mutationFn: async (id) => {
			return await Axios.delete('/api/food/remove', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token} `,
				},
				data: { id: id },
			})
		},

		onMutate: (id) => {
			setLoadingId(id)
		},
		onSuccess: () => {
			queryClient.invalidateQueries(['food_list'])
		},
		onSettled: () => {
			setLoadingId(null)
		},

		onError: (error) => {
			console.log(error)
			// const errorMessage = error.response?.data?.message || 'Sever Error '
			console.log(errorMessage)
		},
	})

	if (isLoading)
		return (
			<div className='text-center pt-[20%]'>
				<Spinner aria-label='Extra small spinner example' size='xl' />
			</div>
		)

	if (isError) {
		return <p> 404 Not found </p>
	}

	const handleDelete = (id) => {
		deleteFoodId(id)
	}

	return (
		<div className=' overflow-x-auto bg-slate-100 bg-opacity-40 rounded-md text-muted drop-shadow-md	'>
			<h2 className='text-center py-2 font-medium text-lg drop-shadow-lg text-slate-700'>
				Food Items
			</h2>
			{foodList.Data.length === 0 ? (
				<div className=' font-medium text-xl text-center flex text-slate-700 mt-[30%] md:mt-[20%] drop-shadow-lg'>
					No Food are uploaded
				</div>
			) : (
				<Table className='bg-transparent  '>
					<Table.Head className=''>
						<Table.HeadCell>Items</Table.HeadCell>
						<Table.HeadCell> food_Name</Table.HeadCell>
						<Table.HeadCell> Price </Table.HeadCell>
						<Table.HeadCell> category </Table.HeadCell>
						<Table.HeadCell>
							<span className='sr-only'>delete </span>
						</Table.HeadCell>
						<Table.HeadCell>
							<span className='sr-only'> Edit </span>
						</Table.HeadCell>
					</Table.Head>

					{foodList.Data.map((adminFoodList, idx) => {
						return (
							<>
								<ReadOnlyFoodList
									key={idx}
									adminFoodList={adminFoodList}
									isPending={loadingId}
									handleDelete={handleDelete}
								/>
							</>
						)
					})}
				</Table>
			)}
		</div>
	)
}

export default FoodList
