import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
	Home,
	ImageUpIcon,
	ListChecks,
	ListOrderedIcon,
	MenuIcon,
	Power,
} from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

import { GrRestaurant } from 'react-icons/gr'
import { ClipLoader, FadeLoader } from 'react-spinners'
import useAuth from '../hooks/useAuth'

import { useState } from 'react'
const SideBar = () => {
	const textClass =
		'flex justify-center gap-3 items-center rounded-md shadow-lg text-neutral-100 text-md  font-semibold py-[10px] hover:bg-blue-400'
	const { handleLogout, logoutPending } = useAuth()
	const [isOpen, setIsOpen] = useState(false)

	function handleToggle() {
		setIsOpen(!isOpen)
	}
	return (
		<div className=' '>
			{/* Sidebar */}
			<div
				className={`bg-gray-800 flex flex-col gap-8 h-screen  text-white p-4 pt-8 ${
					isOpen ? 'w-64' : 'w-[85px]'
				} duration-200 relative`}
			>
				<MenuIcon
					className={`text-3xl absolute top-2  left-6	 cursor-pointer transform ${
						isOpen ? 'rotate-180' : ''
					}`}
					onClick={handleToggle}
				/>
				<div className='border-b-[1px] pb-1 w-full border-slate-500 '>
					<div className='flex  justify-center items-center gap-4 pt-10   '>
						<GrRestaurant
							className={`text-green-400 text-2xl cursor-pointer `}
						/>
						<h1
							className={`text-green-400 origin-left font-medium text-xl duration-200 ${
								!isOpen && 'scale-0'
							}`}
						>
							Fast Order
						</h1>
					</div>
				</div>
				<ul className='pt-6 flex-1'>
					<NavLink to='/' className='flex items-center gap-x-4 p-2'>
						<Home className={`text-white text-xl hover:scale-[1.2]`} />
						<span
							className={`text-white origin-left duration-200 ${
								!isOpen && 'hidden'
							}`}
						>
							Dashboard
						</span>
					</NavLink>
					<NavLink to='/add' className='flex items-center gap-x-4 p-2 mt-4'>
						<ImageUpIcon className='text-white text-xl hover:scale-[1.2]' />
						<span
							className={`text-white origin-left duration-200 ${
								!isOpen && 'hidden'
							}`}
						>
							Upload Items
						</span>
					</NavLink>
					<NavLink to='/list' className='flex items-center gap-x-4 p-2 mt-4'>
						<ListChecks className='text-white text-xl hover:scale-[1.2]' />
						<span
							className={`text-white origin-left duration-200 ${
								!isOpen && 'hidden'
							}`}
						>
							Items
						</span>
					</NavLink>
					<NavLink to='/orders' className='flex items-center gap-x-4 p-2 mt-4'>
						<ListOrderedIcon className='text-white text-xl hover:scale-[1.2]' />
						<span
							className={`text-white origin-left duration-200 ${
								!isOpen && 'hidden'
							}`}
						>
							Orders
						</span>
					</NavLink>
				</ul>
				<div
					onClick={handleLogout}
					className={`bg-gray-600  text-center mx-[10px] px-2 py-1 text-red-500  rounded-md cursor-pointer hover:bg-slate-400 flex justify-center gap-[20px] ${
						!isOpen && 'px-3 mx-1'
					} 
					} `}
				>
					{logoutPending ? (
						!isOpen ? (
							<ClipLoader color='red' size={20} />
						) : (
							<ClipLoader color='red' size={30} />
						)
					) : (
						<div className='flex items-center gap-3'>
							<Power size={20} />
							<span className={`${!isOpen && 'hidden'}`}>logout</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default SideBar
