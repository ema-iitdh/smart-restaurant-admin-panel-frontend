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
		<div className='flex justify-center items-center '>
			<div className='w-full  max-w-lg mx-5 py-3 '>
				{/* <h2 className='text-center pb-3 font-semibold text-xl text-blue-500'>
					Restaurant name {restaurantName}
				</h2> */}
				<Card>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onsubmit)}
							className='p-3 space-y-4'
						>
							<CardHeader>
								<CardTitle className='text-lg text-center'>
									Add food by
									<span className='text-blue-500 pl-2 font-medium'>
										{restaurantName}
									</span>
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-4'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name *</FormLabel>
											<FormControl>
												<Input placeholder='Enter your name' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name='description'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Description </FormLabel>
											<FormControl>
												<Textarea
													placeholder='Enter your Description'
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
											<FormLabel>Price *</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Enter your price'
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
											<FormLabel>Category *</FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={(value) => {
														field.onChange(value)
														handleChangeCategory(value)
													}}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select your category' />
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
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='subCategory'
									render={({ field }) => (
										<FormItem>
											<FormLabel> Sub-Category </FormLabel>
											<FormControl>
												<Select
													value={field.value}
													onValueChange={field.onChange}
												>
													<SelectTrigger>
														<SelectValue placeholder='Select your sub-category' />
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
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='image'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Image *</FormLabel>
											<FormControl>
												<Input
													className='pt-0'
													type='file'
													// {...field}
													onChange={(e) => handleFileChange(e, 'image')}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<div className='flex justify-center'>
								<Button type='submit'> Upload Food </Button>
							</div>
						</form>
					</Form>
				</Card>
			</div>
		</div>
	)
}
