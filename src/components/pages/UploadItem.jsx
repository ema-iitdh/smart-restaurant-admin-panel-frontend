import React, { useState } from 'react'
import uploadImage from '../../assets/images/image-upload.png'
import { Label } from '../ui/label'
import { Axios } from '@/lib/axiosApi'
import { toast } from 'react-toastify'
import { useMutation, useQuery } from '@tanstack/react-query'
import useAuth from '../hooks/useAuth'
import CategoryCreated from '../element/CategoryCreated'

const UploadItem = () => {
	const [image, setImage] = useState()
	const [category, setCategory] = useState({})
	const { token } = useAuth()
	console.log(token)
	const [data, setData] = useState({
		name: '',
		description: '',
		category: '',
		price: '',
	})
	const { data: list } = useQuery({
		queryKey: ['list'],
		queryFn: () => {
			return Axios.get('/api/category/list', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
		},
	})
	const handleCategory = (e) => {
		setCategory(e.target.value)
	}

	const onChangeHandler = (event) => {
		const name = event.target.name
		const value = event.target.value

		setData((prevData) => ({ ...prevData, [name]: value }))
	}

	const onSubmitData = async (e) => {
		e.preventDefault()
		const formData = new FormData()
		console.log(Object.fromEntries(formData))
		formData.append('name', data.name)
		formData.append('description', data.description)
		formData.append('category', category)
		formData.append('price', data.price)
		formData.append('image', image)

		return await Axios.post(`/api/food/upload`, formData, {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `Bearer ${token}`,
			},
		})
	}

	const { mutate: handleUploadFood, isPending } = useMutation({
		mutationKey: ['upload_food'],
		mutationFn: onSubmitData,
		onSuccess: (data) => {
			console.log(data)
			if (data?.data?.success === true) {
				toast.success(data.data.message)
				setData({
					name: '',
					description: '',
					category: '',
					price: '',
				})

				setImage(null)
			} else {
				toast.error('upload Failed!. Please try again.')
			}
		},
		onError: (error) => {
			console.log(error)
			toast.error('upload failed')
		},
	})

	return (
		<div className='  w-full relative'>
			<form onSubmit={handleUploadFood} className='flex justify-center'>
				<div className='absolute z-10 top-0 right-2'>
					<CategoryCreated />
				</div>
				<div className='grid  gap-[10px]   border-[1px] border-slate-200 bg-customWhite rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-15  p-[16px]  w-[100%] max-w-md shadow-lg '>
					<div>
						<label className='block text-sm font-semibold text-muted-foreground mb-2 '>
							Product Image
						</label>
						<div className='mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-orange-400 transition-colors'>
							<div className='space-y-1 text-center'>
								<img
									className='mx-auto h-24 w-24 rounded-md object-cover'
									src={image ? URL.createObjectURL(image) : uploadImage}
									alt='Product preview'
								/>
								<div className='flex text-sm text-gray-600'>
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
											onChange={(e) => setImage(e.target.files[0])}
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
							className='min-w-[100px] text-md text-muted-foreground font-semibold'
						>
							Food Name
						</label>
						{/* <Input
							type='name'
							id='name'
							value={data.name}
							className='shadow-lg'
							onchange={onChangeHandler}
							required
						/> */}
						<input
							onChange={onChangeHandler}
							value={data.name}
							className='border-2 border-slate-300 rounded-lg px-4 py-2'
							type='text'
							name='name'
							placeholder='Type Here'
						/>
					</div>
					<div className='flex flex-col gap-[12px] '>
						<label
							htmlFor='description '
							className='text-md text-muted-foreground font-semibold'
						>
							Description
						</label>
						<textarea
							className='border-2 border-slate-300 p-3 rounded-lg resize-none text-slate-400 outline-none'
							onChange={onChangeHandler}
							value={data.description}
							rows='2'
							name='description'
							placeholder='write the content'
						/>
					</div>
					<div className='flex flex-col gap-[12px]'>
						<label
							htmlFor='name'
							className='min-w-[100px] text-md text-muted-foreground font-semibold '
						>
							Price
						</label>
						<input
							className='border-2 borde-slate-300 px-3 py-2 rounded-lg bg-white outline-none'
							onChange={onChangeHandler}
							value={data.price}
							type='number'
							name='price'
							placeholder='₹10'
						/>
					</div>
					<div className='flex flex-col gap-[12px]  rounded-md'>
						<span className='text-md font-semibold text-muted-foreground'>
							Category
						</span>

						<select
							className='border-2 border-slate-300 outline-none px-3 py-2 rounded-md'
							onChange={handleCategory}
							// value={category}
							name='category'
						>
							{list?.data?.list.map((category, idx) => (
								<option key={idx} value={category.category}>
									{category.category}
								</option>
							))}
						</select>
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
							Upload
						</button>
					)}
				</div>
			</form>
		</div>
		//
	)
}

export default UploadItem
