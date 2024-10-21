import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { NavLink } from 'react-router-dom'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import useAuth from '../hooks/useAuth'
import { Button, Spinner } from 'flowbite-react'

export default function Profile() {
	const email = localStorage.getItem('email')
	const { handleLogout, logoutPending } = useAuth()
	return (
		<div className='bg-customWhite	 h-[60px] flex items-center  shadow-md '>
			<div className=' flex items-center justify-end px-5 gap-4 py-[7px] w-full   '>
				<div className='flex flex-col '>
					{email ? (
						<span className='text-slate-200 text-muted text-sm font-semibold'>
							{email}
							<h2 className=' block text-center text-sm '>Admin</h2>
						</span>
					) : (
						<NavLink to='sign_in'>
							<div className='font-semibold border-[1px] border-slate-500 px-[6px] py-[3px] rounded-md bg-slate-200 hover:bg-slate-100 '>
								Login
							</div>
						</NavLink>
					)}
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger>
						<Avatar>
							<AvatarImage src='https://github.com/shadcn.png' />
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<Button onClick={handleLogout} disabled={logoutPending}>
								{logoutPending ? <Spinner size={15} /> : 'Logout'}{' '}
							</Button>{' '}
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
		// <div className=' fixed top-0 z-10 w-full '>

		// </div>
	)
}
