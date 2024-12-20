import { addRestaurant } from '@/api/apiServices'
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
import { useMutation, useQuery } from '@tanstack/react-query'
import { ChevronDown, ChevronLeft } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { z } from 'zod'
import FormCustomLabel from '../../component/ui/form-components/FormCustomLabel'

const formSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	slug: z.string().min(1, 'Slug is required'),
	description: z.string().optional(),
	email: z.string().email('Invalid email address').min(1, 'Email is required'),
	phone: z.string().min(10, 'Phone number must be at least 10 digits'),
	taxPercentage: z
		.string()
		.transform((val) => {
			if (!val) return undefined
			return Number.parseFloat(val)
		})
		.refine(
			(val) => val === undefined || !Number.isNaN(val),
			'Tax percentage must be a number'
		)
		.refine(
			(val) => val === undefined || (val >= 0 && val <= 100),
			'Tax percentage must be between 0 and 100'
		)
		.refine(
			(val) => val === undefined || Number.isInteger(val),
			'Tax percentage must be an integer'
		),
	address: z.string().min(1, 'Address is required'),
	logo: z.any().refine((file) => file instanceof File || file === null, {
		message: 'Logo must be a file',
	}),
	coverImage: z
		.any()
		.refine((file) => file instanceof File || file === null, {
			message: 'Cover image must be a file',
		})
		.optional(),
})

export default function AddRestaurant() {
	const navigate = useNavigate()
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

	const { mutate: mutateAddRestaurant, isPending } = useMutation({
		mutationFn: addRestaurant,
		onSuccess: () => {
			toast.success('Restaurant created successfully')
			navigate('/super-admin/manage-restaurant')
			form.reset()
		},
		onError: () => {
			toast.error('Restaurant creation failed')
		},
	})

	const handleCreateRestaurant = (values) => {
		const formData = new FormData()
		for (const key in values) {
			formData.append(key, values[key])
		}
		mutateAddRestaurant(formData)
	}

	const handleFileChange = (e, filename) => {
		const file = e.target.files[0]
		console.log('file selected', file)
		if (file) {
			form.setValue(filename, file, { shouldValidate: true })
			console.log('logo', form.getValues(''))
		}
	}

	return (
		<div className='flex flex-col items-center p-6'>
			<div className='w-full max-w-2xl'>
				<div className='flex justify-start mb-4'>
					<Button onClick={() => navigate(-1)} variant='outline'>
						<ChevronLeft size={24} />
						<span className='ml-2'>Back</span>
					</Button>
				</div>
				<Card>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(handleCreateRestaurant)}
							className='p-6 space-y-6'
						>
							<CardHeader>
								<CardTitle className='text-xl font-semibold'>
									Add Restaurant by Super Admin
								</CardTitle>
							</CardHeader>
							<CardContent className='space-y-6'>
								<FormField
									control={form.control}
									name='name'
									render={({ field }) => (
										<FormItem>
											<FormCustomLabel required={true}>Name</FormCustomLabel>
											<FormControl>
												<Input placeholder='Enter restaurant name' {...field} />
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
											<FormCustomLabel required={true}>Slug</FormCustomLabel>
											<FormControl>
												<Input placeholder='Enter restaurant slug' {...field} />
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
											<FormCustomLabel required={false}>
												Description
											</FormCustomLabel>
											<FormControl>
												<Textarea
													placeholder='Enter restaurant description'
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
											<FormCustomLabel required={true}>Email</FormCustomLabel>
											<FormControl>
												<Input
													placeholder='Enter restaurant email'
													{...field}
												/>
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
											<FormCustomLabel required={true}>
												Mobile Number
											</FormCustomLabel>
											<FormControl>
												<Input
													type='tel'
													placeholder='Enter mobile number'
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
											<FormCustomLabel required={false}>
												Tax Percentage (%)
											</FormCustomLabel>
											<FormControl>
												<Input
													type='number'
													placeholder='Enter tax percentage'
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
											<FormCustomLabel required={true}>Address</FormCustomLabel>
											<FormControl>
												<Input
													placeholder='Enter restaurant address'
													{...field}
												/>
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
											<FormCustomLabel required={true}>Logo</FormCustomLabel>
											<FormControl>
												<Input
													className='pt-0'
													type='file'
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
											<FormCustomLabel required={false}>
												Cover Image
											</FormCustomLabel>
											<FormControl>
												<Input
													className='pt-0'
													type='file'
													onChange={(e) => handleFileChange(e, 'coverImage')}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</CardContent>
							<div className='flex justify-center'>
								<Button disabled={isPending} type='submit'>
									{isPending ? 'Adding...' : 'Add Restaurant'}
								</Button>
							</div>
						</form>
					</Form>
				</Card>
			</div>
		</div>
	)
}
