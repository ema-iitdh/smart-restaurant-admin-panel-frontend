import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
	Form,
	FormField,
	FormItem,
	FormLabel,
	FormControl,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { ArrowLeft, Plus } from 'lucide-react'
import FormCustomLabel from '../../../component/ui/form-components/FormCustomLabel'
import AddSubCategory from './AddSubCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router'

const formSchema = z.object({
	category: z.string().nonempty(),
	subcategories: z.array(z.string().nonempty()),
})
export default function AddCategory() {
	const navigate = useNavigate()
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			category: '',
		},
	})

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<div className='relative p-4 md:p-8 w-full max-w-md mx-auto'>
			<Button
				onClick={() => navigate(-1)}
				className='absolute top-[-7%] left-[-10%] md:left-[-12%]'
				variant='ghost'
			>
				<ArrowLeft size={30} className='hover:scale-110 transition-transform' />{' '}
				back
			</Button>
			<Form {...form} className='p-4 md:p-6 bg-white rounded-lg shadow-md'>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-4 md:space-y-6 text-customBlack'
				>
					<h2 className='text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center'>
						Add Category
					</h2>
					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormCustomLabel required={true}>Category Name</FormCustomLabel>
								<FormControl>
									<Input
										placeholder='Category Name'
										{...field}
										className='mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type='submit'
						className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md'
					>
						Save Category
					</Button>
				</form>
			</Form>
			<div className='mt-6 md:mt-8'>
				<AddSubCategory />
			</div>
		</div>
	)
}
