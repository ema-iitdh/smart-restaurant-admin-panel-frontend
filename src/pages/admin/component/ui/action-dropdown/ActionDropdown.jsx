import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useCallback, useEffect, useState } from 'react'
import DeleteDialog from './delete-dialog'

function ActionDropdown({ editUrl, deleteApiFunction, data = {} }) {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false)

	useEffect(() => {
		if (!isDropdownOpen) {
			setTimeout(() => {
				document.body.style.pointerEvents = ''
			}, 0)
		}
	}, [isDropdownOpen])

	const closeDropdown = useCallback(() => setIsDropdownOpen(false), [])

	return (
		<DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant='ghost' className='h-8 w-8 p-0'>
					<span className='sr-only'>Open menu</span>
					<MoreHorizontal className='h-4 w-4' />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem asChild>
					<Link to={editUrl}>
						<Button size='xs' variant='ghost' className='w-full'>
							Edit
						</Button>
					</Link>
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<DeleteDialog
						deleteApiFunction={deleteApiFunction}
						data={data}
						closeDropdown={closeDropdown}
					/>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}

export default ActionDropdown
