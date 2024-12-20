import {
	useCategorylist,
	useSubCategoryList,
} from '@/components/hooks/useCategorylist'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { Axios } from '@/lib/axiosApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { SelectLabel } from '@radix-ui/react-select'
import { Textarea } from 'flowbite-react'
import { CalendarCog } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'
import { z } from 'zod'
import FormCustomLabel from '../../component/ui/form-components/FormCustomLabel'

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	description: z.string().optional(),
	price: z
		.number()
		.min(2, 'Price must be at least 2')
		.refine((val) => !isNaN(val), {
			message: 'Price must be a number',
		}),

	category: z.string().min(1, 'Category is required'),
	subCategory: z.string().optional(),
	image: z.any().refine((file) => file instanceof File || file === null, {
		message: 'Image must be a file',
	}),
})

export default function AddFood() {
	const [selectCategory, setSelectCategory] = useState('')
	const location = useLocation()
	const restaurantName = location.state?.originalRestaurantName
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			description: '',
			price: 0,
			category: '',
			subategory: '',
			image: null || undefined,
		},
	})

	const handleFileChange = (e, filename) => {
		const file = e.target.files[0]
		console.log('file selected', file)
		if (file) {
			form.setValue(filename, file, { shouldValidate: true })
			console.log('image', form.getValues('image'))
		}
	}
	// sending from backend
	const token = localStorage.getItem('token')
	const handleSubmit = async (values) => {
		const formData = new FormData()
		formData.append('image', values.image) // Append the image file
		formData.append('name', values.name)
		formData.append('category', values.category)
		formData.append('description', values.description)
		formData.append('price', values.price)
		formData.append('subCategory', values.subCategory)
		const response = await Axios.post(
			`/api/food/upload/${encodeURIComponent(restaurantName)}`,
			formData,
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'multipart/form-data',
				},
			}
		)
		console.log(response.data)
		return response.data
		form.reset()
	}
	function onsubmit(values) {
		console.log(values)
		handleSubmit(values)
	}

	const { data: categorylist } = useCategorylist(
		encodeURIComponent(restaurantName)
	)
	const { data: subCategories } = useSubCategoryList(
		encodeURIComponent(restaurantName),
		selectCategory
	)
	const handleChangeCategory = (value) => {
		console.log('value', value)
		setSelectCategory(value)
		form.setValue('category', value)
	}

	return (
		<div className=' py-5'>
			<div className='max-w-3xl mx-auto px-4'>
				<div className='mb-8 text-center'>
					<h1 className='text-2xl font-bold text-gray-900'>{restaurantName}</h1>
					<p className='text-gray-600'>Add New Food Item</p>
				</div>

				<Card className='shadow-lg rounded-md overflow-hidden bg-white'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onsubmit)} className='space-y-6'>
							<CardHeader className='border-b bg-blue-50	'>
								<CardTitle className='text-xl'>Food Details</CardTitle>
							</CardHeader>

							<CardContent className='grid grid-cols-1 md:grid-cols-2 gap-6 p-6'>
								<div className='md:col-span-2'>
									<FormField
										control={form.control}
										name='image'
										render={({ field }) => (
											<FormItem>
												<FormCustomLabel
													required={true}
													className='block text-sm font-medium text-gray-700'
												>
													Food Image
												</FormCustomLabel>
												<div className='mt-1'>
													<Input
														type='file'
														className=' pt-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-500 file:text-white hover:file:bg-blue-600'
														onChange={(e) => handleFileChange(e, 'image')}
														accept='image/*'
													/>
												</div>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormCustomLabel
												required={true}
												className='block text-sm font-medium text-gray-700'
											>
												Food Name
											</FormCustomLabel>
											<FormControl>
												<Input
													className='w-full'
													placeholder='Enter food name'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='price'
									render={({ field }) => (
										<FormItem>
											<FormCustomLabel
												required={true}
												className='block text-sm font-medium text-gray-700'
											>
												Price
											</FormCustomLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='0.00'
													className='w-full'
													value={field.value || ''}
													onChange={(e) => {
														const value = parseFloat(e.target.value)
														field.onChange(isNaN(value) ? '' : value)
													}}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='category'
									render={({ field }) => (
										<FormItem>
											<FormCustomLabel
												required={true}
												className='block text-sm font-medium text-gray-700'
											>
												Category
											</FormCustomLabel>
											<Select
												value={field.value}
												onValueChange={(value) => {
													field.onChange(value)
													handleChangeCategory(value)
												}}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select category' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{categorylist?.category?.map(
															(categoryName, idx) => (
																<SelectItem
																	key={idx}
																	value={categoryName.category}
																>
																	{categoryName.category}
																</SelectItem>
															)
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='subCategory'
									render={({ field }) => (
										<FormItem>
											<FormLabel className='block text-sm font-medium text-gray-700'>
												Sub-Category
											</FormLabel>
											<Select
												value={field.value}
												onValueChange={field.onChange}
											>
												<SelectTrigger className='w-full'>
													<SelectValue placeholder='Select sub-category' />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														{subCategories?.subcategories.map(
															(subcategory, idx) => (
																<SelectItem value={subcategory} key={idx}>
																	{subcategory}
																</SelectItem>
															)
														)}
													</SelectGroup>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className='md:col-span-2'>
									<FormField
										control={form.control}
										name='description'
										render={({ field }) => (
											<FormItem>
												<FormLabel className='block text-sm font-medium text-gray-700'>
													Description
												</FormLabel>
												<FormControl>
													<Textarea
														className='w-full min-h-[100px]'
														placeholder='Enter food description'
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>
							</CardContent>
							<div className='px-6 py-4 bg-blue-50 border-t flex justify-end'>
								<Button
									type='submit'
									className='bg-blue-500 hover:bg-blue-600 text-white px-6'
								>
									Add Food Item
								</Button>
							</div>
						</form>
					</Form>
				</Card>
			</div>
		</div>
	)
}
