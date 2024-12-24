import useGetAllPermissions from '@/hooks/api/query/useGetAllPermissions'
import { useParams } from 'react-router'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import * as z from 'zod'
import { useUpdatePermission } from '@/hooks/api/mutation/useUpdatePermission'

const formSchema = z.object({
	title: z.string().min(2, {
		message: 'Permission name must be at least 2 characters.',
	}),
	url: z.string().min(2, {
		message: 'url must be at least 2 characters.',
	}),
})

export default function UpdatePermission() {
	const { userId, permissionId } = useParams()
	const { data: allPermission } = useGetAllPermissions(userId)
	const [filteredPermission, setFilteredPermission] = useState(null)

	useEffect(() => {
		if (allPermission && allPermission.permissions) {
			const permission = allPermission.permissions.find(
				(permission) => permission._id === permissionId
			)
			setFilteredPermission(permission)
		} else {
			setFilteredPermission(null)
		}
	}, [allPermission, permissionId])

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			url: '',
		},
	})

	useEffect(() => {
		if (filteredPermission) {
			form.reset({
				title: filteredPermission.title,
				url: filteredPermission.url,
			})
		}
	}, [filteredPermission, form])

	const { mutate, isLoading: isPending } = useUpdatePermission()
	const handleUpdatePermission = (values) => {
		if (!filteredPermission) {
			console.error(
				'Cannot update permission: Permission data is null or undefined'
			)
			return
		}
		mutate({
			values: { ...values, _id: permissionId },
			userId,
		})
	}

	return (
		<div className='container max-w-md mx-auto p-6 border-[1px] border-gray-200 rounded-md shadow-md'>
			<h1 className='text-center font-semibold '>Update Permission</h1>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleUpdatePermission)}
					className='space-y-8'
				>
					<FormField
						control={form.control}
						name='title'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Permission Name</FormLabel>
								<FormControl>
									<Input placeholder='Enter permission name' {...field} />
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
								<FormLabel>URL</FormLabel>
								<FormControl>
									<Input placeholder='Enter URL' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button disabled={isPending} type='submit'>
						{isPending ? 'loading...' : ' Update Permission'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
