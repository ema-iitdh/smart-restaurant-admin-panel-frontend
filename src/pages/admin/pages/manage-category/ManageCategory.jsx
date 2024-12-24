import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'react-toastify'
import CategoryTable from './category-table'
import { Link } from 'react-router-dom'

export default function ManageCategory() {
	const [categoryName, setCategoryName] = useState('')
	const [subCategoryName, setSubCategoryName] = useState('')
	const [subCategories, setSubCategories] = useState([])

	const handleAddCategory = () => {
		if (categoryName.trim() === '') {
			toast.error('Category name cannot be empty')
			return
		}
		toast.success(`Category "${categoryName}" added successfully`)
		setCategoryName('')
	}

	const handleAddSubCategory = () => {
		if (subCategoryName.trim() === '') {
			toast.error('Subcategory name cannot be empty')
			return
		}
		setSubCategories([...subCategories, subCategoryName])
		toast.success(`Subcategory "${subCategoryName}" added successfully`)
		setSubCategoryName('')
	}

	return (
		<div className='p-4'>
			<h1 className='text-2xl font-bold mb-4'>Manage Categories</h1>
			<div className='mb-4'>
				<Link to='add-category'>
					<Button className='bg-blue-500 text-white'>
						Add Category/Sub-Category
					</Button>
				</Link>
			</div>
			<CategoryTable />
		</div>
	)
}
