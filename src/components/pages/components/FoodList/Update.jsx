import useAuth from '@/components/hooks/useAuth'
import { Axios, url } from '@/lib/axiosApi'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import uploadImage from '../../../../assets/images/image-upload.png'
import { toast } from 'react-toastify'

export default function Update() {
	const { id } = useParams()
	const { token } = useAuth()
	console.log(token)
	const queryClient = useQueryClient()
	const navigate = useNavigate()
	const [values, setValues] = useState({
		_id: id,
		name: '',
		description: '',
		category: '',
		price: '',
		image: null,
	})

	const { data: foodData } = useQuery({
		queryKey: ['food_list'],
		queryFn: async () => {
			const response = await Axios.get('/api/food/foodlist', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			return response.data
		},
		enabled: !!token,
	})

	useEffect(() => {
		if (foodData && id) {
			const items = foodData.Data.find((item) => item._id === id)
			console.log(items)
			if (items) {
				setValues({
					_id: items._id,
					name: items.name,
					category: items.category,
					price: items.price,
					description: items.description,
					image: null,
				})
			}
		}
	}, [foodData, id])
	const onChangeHandler = (e) => {
		const { name, value } = e.target
		if (name === 'image') {
			setValues({ ...values, image: files[0] })
		} else {
			setValues({ ...values, [name]: value })
		}
	}
	const { mutate: handleEditFooditems, isPending } = useMutation({
		mutationKey: ['update_food'],
		mutationFn: async () => {
			const formData = new FormData()
			formData.append('name', values.name)
			formData.append('category', values.category)
			formData.append('price', values.price)
			formData.append('description', values.description)
			if (values.image) {
				formData.append('image', values.image)
			}
			const response = await Axios.put(`/api/food/edit/${id}`, formData, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			return response.data
		},
		onSuccess: (data) => {
			console.log(data.message)
			queryClient.invalidateQueries(['food_list'])
			navigate('/list', { replace: true })
		},
		onError: (error) => {
			const updateError = error.response?.data?.message
			console.error('Error updating food item', error.response?.data?.message)
			toast.error(updateError)
		},
	})

	const handleSubmit = (e) => {
		e.preventDefault()
		handleEditFooditems()
	}

	return (
		<div className='  w-full relative'>
			<h2 className='text-center mb-3 text-xl font-medium drop-shadow-md text-slate-100'>
				Edit Food Items
			</h2>
			<form onSubmit={handleSubmit} className='flex justify-center'>
				<div className='grid   gap-[10px]  border-[1px] border-slate-200 bg-gray-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15  p-[16px]  w-[100%] max-w-md shadow-lg '>
					<div>
						<label className='block text-sm font-medium text-gray-100 mb-2'>
							Product Image
						</label>
						<div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-orange-400 transition-colors'>
							<div className='flex text-sm text-gray-600'>
								<div className='flex flex-col justify-center items-center'>
									<img
										className='object-cover'
										src={values.image ? `${url}/${values.image}` : uploadImage}
										width={60}
										height={60}
									/>
									<label
										htmlFor='image'
										className='relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500'
									>
										<span className='px-[10px] py-[5px] rounded-full   '>
											Upload a file
										</span>
										<input
											id='image'
											name='image'
											type='file'
											className='sr-only'
											value={values.image}
											onChange={onChangeHandler}
											required
										/>
									</label>
								</div>
							</div>
						</div>
					</div>
					<div className='flex flex-col gap-[12px] '>
						<label
							htmlFor='name'
							className='min-w-[100px] text-md text-slate-100 '
						>
							Food Name
						</label>

						<input
							onChange={onChangeHandler}
							value={values.name}
							className='border-2 border-slate-300 rounded-lg px-4 py-2'
							type='text'
							name='name'
							placeholder='Type Here'
						/>
					</div>
					<div className='flex flex-col gap-[12px] '>
						<label htmlFor='description ' className='text-md text-slate-100'>
							Description
						</label>
						<textarea
							className='border-2 border-slate-300 p-3 rounded-lg resize-none text-slate-400 outline-none'
							onChange={onChangeHandler}
							value={values.description}
							rows='2'
							name='description'
							placeholder='write the content'
						/>
					</div>
					<div className='flex flex-col gap-[12px]'>
						<label
							htmlFor='name'
							className='min-w-[100px] text-md text-slate-100 '
						>
							Price
						</label>
						<input
							className='border-2 borde-slate-300 px-3 py-2 rounded-lg bg-white outline-none'
							onChange={onChangeHandler}
							value={values.price}
							type='number'
							name='price'
							placeholder='₹10'
						/>
					</div>
					<div className='flex flex-col gap-[12px]  rounded-md'>
						<span className='text-md font-semibold text-slate-100'>
							Category
						</span>
						<input
							name='category'
							type='text'
							placeholder='category'
							value={values.category}
							onChange={onChangeHandler}
						/>
						{/* <select
							className='border-2 border-slate-300 outline-none px-3 py-2 rounded-md'
							onChange={handleCategory}
							// value={category}
							name='category'
						>
							{list?.data.list.map((category, idx) => (
								<option key={idx} value={category.category}>
									{category.category}{' '}
								</option>
							))}
						</select> */}
					</div>
					{isPending ? (
						<button class='btn btn-secondary' type='button' disabled>
							<span
								className='spinner-border spinner-border-sm'
								aria-hidden='true'
							></span>
							<span role='status'>Loading...</span>
						</button>
					) : (
						<button
							type='submit'
							className='bg-black text-white py-[5px] hover:bg-gray-800 rounded-lg shadow-lg'
						>
							update
						</button>
					)}
				</div>
			</form>
		</div>
	)
}
