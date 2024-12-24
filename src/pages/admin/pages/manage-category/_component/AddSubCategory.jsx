import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import FormCustomLabel from '@/pages/admin/component/ui/form-components/FormCustomLabel'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	subcategories: z.array(z.string().min(1, 'Subcategory name is required')),
})

export default function AddSubCategory() {
	const [subcategories, setSubcategories] = useState([''])
	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			subcategories: [''],
		},
	})

	const handleAddSubcategory = () => {
		setSubcategories([...subcategories, ''])
	}

	const handleSubcategoryChange = (index, value) => {
		const newSubcategories = [...subcategories]
		newSubcategories[index] = value
		setSubcategories(newSubcategories)
	}

	const onSubmit = (data) => {
		console.log(data)
	}

	return (
		<div className='p-6 bg-white rounded-lg shadow-md'>
			<Form {...form} className='p-6 bg-white rounded-lg shadow-md'>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-6 text-customBlack'
				>
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
													onChange={(e) =>
														handleSubcategoryChange(index, e.target.value)
													}
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
						type='submit'
						className='mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-md'
					>
						Save Subcategories
					</Button>
				</form>
			</Form>
		</div>
	)
}
