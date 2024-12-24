import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import useGetAllAdmin from '@/hooks/api/query/useGetAllAdmin'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import FormCustomLabel from '../../component/ui/form-components/FormCustomLabel'
import { Input } from '@/components/ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Axios } from '@/lib/axiosApi'
import { handleAddPermission } from '@/api/apiServices'

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Title is required',
	}),
	url: z
		.string()
		.min(1, {
			message: 'URL is required',
		})
		.regex(/^\/.*$/, {
			message: 'URL must start with /',
		}),
	icon: z.string().min(1, {
		message: 'Icon is required',
	}),
})

export default function AddPermissionRoute() {
	const { data: getAllAdmin, isLoading } = useGetAllAdmin()
	const [selectedAdmin, setSelectedAdmin] = useState('')

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: { title: '', url: '', icon: '' },
	})

	const { mutate, isPending } = useMutation({
		mutationFn: ({ values, userId }) =>
			handleAddPermission({ permissions: [values] }, userId),
		onSuccess: () => {
			toast.success('Permission added successfully')
			form.reset()
		},
		onError: (error) => {
			toast.error(error.message)
		},
	})

	const handleCreatedPermission = (values) => {
		mutate({ values, userId: selectedAdmin })
	}
	console.log('selectedAdmin', selectedAdmin)

	if (isLoading) return <div>Loading...</div>

	return (
		<div className='p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md'>
			<h2 className='text-2xl font-semibold mb-6 text-gray-800'>
				Admin Permissions Management
			</h2>
			<div className='mb-8'>
				<Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
					<SelectTrigger className='w-full'>
						<SelectValue placeholder='Select an admin to manage permissions' />
					</SelectTrigger>
					<SelectContent>
						{getAllAdmin?.adminData?.map((admin) => (
							<SelectItem key={admin._id} value={admin._id}>
								{`${admin.name} - ${admin.email}`}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<Form {...form} className='space-y-6'>
				<form
					onSubmit={form.handleSubmit(handleCreatedPermission)}
					className='space-y-4'
				>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormCustomLabel required={true}>Title</FormCustomLabel>
								<FormControl>
									<Input
										{...field}
										type='text'
										placeholder='Enter permission title'
										className='w-full'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='url'
						render={({ field }) => (
							<FormItem>
								<FormCustomLabel required={true}>URL</FormCustomLabel>
								<FormControl>
									<Input
										{...field}
										type='text'
										placeholder='Enter URL path'
										className='w-full'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='icon'
						render={({ field }) => (
							<FormItem>
								<FormCustomLabel required={true}>Icon</FormCustomLabel>
								<FormControl>
									<Input
										{...field}
										type='text'
										placeholder='Enter icon name'
										className='w-full'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						disabled={isPending}
						type='submit'
						className='w-full bg-primary text-white py-2 rounded-md'
					>
						{isPending ? 'Please wait...' : 'Add Permission'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
