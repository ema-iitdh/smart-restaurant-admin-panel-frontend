import useAuth from '@/components/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { useCreatedSubcategory } from '@/hooks/api/mutation/useCreatedSubcategory'
import useGetALlCategories from '@/hooks/api/query/useGetALlCategories'
import FormCustomLabel from '@/pages/admin/component/ui/form-components/FormCustomLabel'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { z } from 'zod'

const formSchema = z.object({
	subcategories: z
		.array(
			z
				.string()
				.min(1, 'Subcategory name is required')
				.max(50, 'Subcategory name must be less than 50 characters')
				.trim()
		)
		.min(1, 'At least one subcategory is required')
		.max(10, 'Maximum 10 subcategories allowed'),
	categoryId: z
		.string()
		.nonempty('Category is required')
		.regex(/^[0-9a-fA-F]{24}$/, 'Invalid category ID format'),
})

export default function AddSubCategory() {
	const { user } = useAuth()
	const restaurantId = user?.restaurant
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	const [subcategories, setSubcategories] = useState([''])
	const [selectCategoryId, setSelectCategoryId] = useState('')

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			subcategories: [''],
			categoryId: '',
		},
	})

	const { data: allCategories } = useGetALlCategories(restaurantId)

	const handleAddSubcategory = () => {
		setSubcategories([...subcategories, ''])
	}

	const handleSubcategoryChange = (index, value) => {
		const newSubcategories = [...subcategories]
		newSubcategories[index] = value
		setSubcategories(newSubcategories)
	}

	const { mutate, isPending, isError, error } = useCreatedSubcategory({
		onSuccess: () => {
			toast.success('SubCategory added successfully')
			form.reset()
			queryClient.invalidateQueries(['categories'])
			navigate(-1)
		},
		onError: () => {
			toast.error(error.message)
		},
	})

	const handleCreatedSubcategory = (values) => {
		mutate({
			categoryId: selectCategoryId,
			subcategories: values.subcategories,
			restaurantId,
		})
	}

	return (
		<div className='p-6 bg-white rounded-lg shadow-md'>
			<Form {...form} className='p-6 bg-white rounded-lg shadow-md'>
				<form
					onSubmit={form.handleSubmit(handleCreatedSubcategory)}
					className='space-y-6 text-customBlack'
				>
					<FormField
						control={form.control}
						name='categoryId'
						render={({ field }) => (
							<FormItem>
								<FormCustomLabel required={true}>
									Select Category
								</FormCustomLabel>
								<Select
									value={selectCategoryId}
									onValueChange={(value) => {
										setSelectCategoryId(value)
									}}
								>
									<SelectTrigger>
										<SelectValue placeholder='Select Category' />
									</SelectTrigger>
									<SelectContent>
										{allCategories?.categories?.map((category) => (
											<SelectItem key={category._id} value={category._id}>
												{category.category}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormCustomLabel className='text-md font-semibold mb-2'>
						Subcategories
					</FormCustomLabel>
					<div className='w-full flex-1 items-center gap-3'>
						{subcategories.map((subcategory, index) => (
							<div key={index} className='flex items-center gap-2 mb-2'>
								<FormField
									control={form.control}
									name={`subcategories.${index}`}
									render={({ field }) => (
										<FormItem className='flex-1'>
											<FormControl>
												<Input
													{...field}
													placeholder='Subcategory Name'
													value={subcategory}
													onChange={(e) => {
														handleSubcategoryChange(index, e.target.value)
														field.onChange(e.target.value)
													}}
													className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						))}
						<Button
							type='button'
							onClick={handleAddSubcategory}
							className='bg-emerald-500 hover:bg-emerald-600 text-white py-2 rounded-md'
						>
							<Plus className='mr-2' /> Add Another Subcategory
						</Button>
					</div>
					<Button
						disabled={isPending}
						type='submit'
						className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md'
					>
						{isPending ? 'Loading...' : 'Save Subcategories'}
					</Button>
				</form>
			</Form>
		</div>
	)
}
