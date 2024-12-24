import React, { useCallback, useEffect, useState } from 'react'
import { TableCell, TableRow } from '@/components/ui/table'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Delete, MoreHorizontal, Pencil, Trash } from 'lucide-react'

import { Link } from 'react-router-dom'
import { deletePermission } from '@/api/apiServices'
import DeleteDialog from './dropdown-action/delete-dialog'

export default function AllPermissionDataTable({
	permission,
	isLoading,
	isError,
	error,
	userId,
}) {
	if (isError)
		return (
			<TableRow>
				<TableCell colSpan={3} className='text-center py-8'>
					<div className='flex flex-col items-center gap-2 text-destructive'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-6 w-6'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
							/>
						</svg>
						<p className='text-sm'>
							{error?.response?.message || 'An error occurred'}
						</p>
					</div>
				</TableCell>
			</TableRow>
		)

	const [isDropdownOpen, setIsDropdownOpen] = useState(false)
	console.log('permissions', userId)
	useEffect(() => {
		if (!isDropdownOpen) {
			setTimeout(() => {
				document.body.style.pointerEvents = ''
			}, 0)
		}
	}, [isDropdownOpen])

	const closeDropdown = useCallback(() => setIsDropdownOpen(false), [])

	return (
		<TableRow>
			<TableCell>{permission?.title}</TableCell>
			<TableCell>{permission?.url}</TableCell>
			<TableCell>{permission?.icon}</TableCell>
			<TableCell className='text-right'>
				<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
					<DropdownMenuTrigger asChild>
						<Button variant='ghost' className='h-8 w-8 p-0'>
							<MoreHorizontal className='h-4 w-4' />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>Actions</DropdownMenuLabel>
						<DropdownMenuItem asChild>
							<Link to={`update-permission/${userId}/${permission._id}`}>
								<div className='flex items-center gap-2'>
									<Pencil className='h-4 w-4' />
									<span>Edit</span>
								</div>
							</Link>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem asChild>
							<DeleteDialog
								closeDropdown={closeDropdown}
								data={permission}
								deletePermission={deletePermission}
								userId={userId}
								permissionIds={[permission._id]}
								isLoading={isLoading}
							/>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</TableCell>
		</TableRow>
	)
}
