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
import { Textarea } from '@/components/ui/textarea'
import { Axios } from '@/lib/axiosApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	description: z.string().optional(),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Phone number must be at least 10 digits'),
	taxPercentage: z
		.string()
		.transform((val) => parseFloat(val))
		.refine((val) => !isNaN(val), 'Tax percentage must be a number')
		.refine(
			(val) => val >= 0 && val <= 100,
			'Tax percentage must be between 0 and 100'
		)
		.refine(
			(val) => Number.isInteger(val),
			'Tax percentage must be an integer'
		),
	address: z.string().min(1, 'Address is required'),
	logo: z.any().refine((file) => file instanceof File || file === null, {
		message: 'Logo must be a file',
	}),
	coverImage: z.any().refine((file) => file instanceof File || file === null, {
		message: 'Cover image must be a file',
	}),
})
export default function AddRestaurant() {
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			slug: '',
			description: '',
			email: '',
			phone: '',
			taxPercentage: 0,
			address: '',
			logo: null || undefined,
			coverImage: null || undefined,
		},
	})

	const handleSubmit = async (values) => {
		try {
			const formData = new FormData()
			for (const key in values) {
				formData.append(key, values[key])
			}
			const response = await Axios.post('/api/restaurant/create', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			console.log('successfully', response.data)
			toast.success('restaurant created successfully')
			form.reset()
			return response.data
		} catch (error) {
			console.error('Error submitting data:', error)
			throw error
		}
	}
	function onsubmit(values) {
		console.log(values)
		handleSubmit(values)
	}
	const handleFileChange = (e, filename) => {
		const file = e.target.files[0]
		console.log('file selected', file)
		if (file) {
			form.setValue(filename, file, { shouldValidate: true })
			console.log('logo', form.getValues(''))
		}
	}
	console.log('tax', form.getValues().taxPercentage)

	const { data: restaurantGetAll } = useQuery({
		queryKey: ['restaurants'],
		queryFn: async () => {
			return await Axios.get('/api/restaurant/getall')
		},
	})

	console.log('rest', restaurantGetAll)

	return (
		<div className='flex justify-center items-center p-3'>
			<div className='w-full  max-w-lg mx-5 '>
				<Card>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onsubmit)}
							className='p-3 space-y-4'
						>
							<CardHeader>
								<CardTitle className='text-lg'>
									Add Restaurant by Super_Admin
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
									name='slug'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Slug *</FormLabel>
											<FormControl>
												<Input placeholder='Enter you slug' {...field} />
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
									name='email'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Email *</FormLabel>
											<FormControl>
												<Input placeholder='Enter your email' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='phone'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Mobile Number *</FormLabel>
											<FormControl>
												<Input
													type='tel'
													placeholder='Enter your Mobile number'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='taxPercentage'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tax Percentage *</FormLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Enter your tax percentage'
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='address'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Address *</FormLabel>
											<FormControl>
												<Input placeholder='Enter your address' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='logo'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Logo *</FormLabel>
											<FormControl>
												<Input
													className='pt-0'
													type='file'
													// {...field}
													onChange={(e) => handleFileChange(e, 'logo')}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name='coverImage'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Cover Image *</FormLabel>
											<FormControl>
												<Input
													className='pt-0'
													type='file'
													// {...field}
													onChange={(e) => handleFileChange(e, 'coverImage')}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<div className='flex justify-center'>
								<Button type='submit'>Add Restaurant</Button>
							</div>
						</form>
					</Form>
				</Card>
			</div>
		</div>
	)
}
