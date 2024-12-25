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
import { useUpdateCategory } from '@/hooks/api/mutation/useUpdateCategory'
import useGetALlCategories from '@/hooks/api/query/useGetALlCategories'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router'
import { z } from 'zod'

const formSchema = z.object({
	category: z.string().min(2, {
		message: 'Category name must be at least 2 characters.',
	}),
})

export default function UpdateCategory() {
	const { restaurantId, categoryId } = useParams()
	const { data: allCategories } = useGetALlCategories(restaurantId)

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: '',
		},
	})

	useEffect(() => {
		if (allCategories?.categories) {
			const category = allCategories.categories.find(
				(category) => category._id === categoryId
			)

			if (category) {
				form.reset({
					category: category.category,
				})
			}
		}
	}, [allCategories, categoryId, form])

	const { mutate, isPending, isError, error } = useUpdateCategory()
	const handleUpdateCategory = async (values) => {
		try {
			console.log('values', values)
			mutate({
				categoryId,
				restaurantId,
				values,
			})
			// Add your API call here
			// await updateCategory({ ...values, restaurantId, categoryId })
		} catch (error) {
			console.error('Error updating category:', error)
		}
	}

	return (
		<div className='p-6 bg-white rounded-lg shadow-md'>
			<div className='pb-3'>
				<span className='text-md text-black font-medium'>Update Category</span>
				<h2 className='text-base text-muted-foreground font-semibold'>
					Manage category and subcategory
				</h2>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(handleUpdateCategory)}
					className='space-y-6'
				>
					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category Name</FormLabel>
								<FormControl>
									<Input placeholder='Enter category name' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						disabled={isPending}
						type='submit'
						className='bg-primary text-white w-full'
					>
						{isPending ? 'Loading...' : 'Update Category'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
