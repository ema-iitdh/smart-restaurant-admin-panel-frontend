import { Axios, url } from '@/lib/axiosApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Delete, DeleteIcon, FlameKindlingIcon, Pencil } from 'lucide-react'
import React, { useState } from 'react'
import { Spinner } from 'flowbite-react'
import useAuth from '@/components/hooks/useAuth'
import { NavLink } from 'react-router-dom'
import Pagination from './Pagination' // Ensure this is implemented correctly
import FoodListTables from './FoodListTables'

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
			const response = await Axios.get('/api/food/foodlist', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		},
	})

	const { mutate: deleteFoodId } = useMutation({
		mutationKey: ['DeleteFood'],
		mutationFn: async (id) => {
			await Axios.delete('/api/food/remove', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				data: { id },
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
			console.error(error)
		},
	})

	if (isLoading) {
		return (
			<div className='text-center pt-[20%]'>
				<Spinner aria-label='Loading...' size='xl' />
			</div>
		)
	}

	if (isError) {
		return <p>404 Not found</p>
	}

	const handleDelete = (id) => {
		deleteFoodId(id)
	}

	return (
		<div className='container md:mx-auto  md:px-4 font-manrope '>
			<FoodListTables foodList={foodList} />
			{/* Pagination component should receive necessary props */}
		</div>
	)
}

export default FoodList
