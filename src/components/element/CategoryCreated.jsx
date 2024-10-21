'use client'

import { useState } from 'react'
import { BiCaretDown } from 'react-icons/bi'
import {
	Button,
	Popover,
	Label,
	TextInput,
	FloatingLabel,
	Spinner,
} from 'flowbite-react'
import { PlusIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Axios } from '@/lib/axiosApi'
import useAuth from '../hooks/useAuth'

function CategoryCreated() {
	const [open, setOpen] = useState(false)
	const [categoryName, setCategoryName] = useState('')

	const { token } = useAuth()
	const queryclient = useQueryClient()

	const { mutate: handleCategoryCreated, isPending } = useMutation({
		mutationKey: ['category_name'],
		mutationFn: async () => {
			return await Axios.post(
				'/api/category/create',
				{
					category: categoryName,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
		},
		onSuccess: (data) => {
			console.log(data)
			setCategoryName('')
			queryclient.invalidateQueries('category_name')
		},
	})

	console.log(categoryName)
	return (
		<Popover
			aria-labelledby='area-popover'
			open={open}
			onOpenChange={setOpen}
			content={
				<div className='flex w-64 flex-col gap-4 p-4 text-sm text-gray-500 dark:text-gray-400'>
					<div>
						<div className='mb-2 block'>
							<Label htmlFor='Category' value='Category' />
						</div>
						<TextInput
							onChange={(e) => setCategoryName(e.target.value)}
							value={categoryName}
							name='category'
							id='category'
						/>
					</div>

					<div className='flex gap-2'>
						<Button
							color='success'
							type='submit'
							onClick={() => handleCategoryCreated()}
						>
							{isPending ? <Spinner color='success' size='sm' /> : 'Save'}
						</Button>
					</div>
				</div>
			}
		>
			<Button>
				<PlusIcon />
				Add New Category
			</Button>
		</Popover>
	)
}
export default CategoryCreated
