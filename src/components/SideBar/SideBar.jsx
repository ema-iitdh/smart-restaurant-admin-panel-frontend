import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
	Home,
	ImageUpIcon,
	LayoutDashboard,
	ListChecks,
	ListOrderedIcon,
	MenuIcon,
	Power,
} from 'lucide-react'

import { GrRestaurant } from 'react-icons/gr'
import { ClipLoader, FadeLoader } from 'react-spinners'
import useAuth from '../hooks/useAuth'

import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const SideBar = () => {
	const textClass =
		'flex justify-center gap-3 items-center rounded-md shadow-lg text-neutral-100 text-md  font-semibold py-[10px] hover:bg-blue-400'
	const { handleLogout, logoutPending } = useAuth()
	const [isOpen, setIsOpen] = useState(false)

	function handleToggle() {
		setIsOpen(!isOpen)
	}
	return (
		<div className=' text-customWhite  '>
			{/* Sidebar */}
			<div
				className={`bg-gray-800 flex flex-col gap-8 h-screen  text-slate-600 p-4 pt-8 ${
					isOpen ? 'w-64' : 'w-[85px]'
				} duration-200 relative`}
			>
				<MenuIcon
					className={`text-3xl  cursor-pointer transform ${
						isOpen ? 'rotate-180' : ''
					}`}
					onClick={handleToggle}
				/>
				<div className='border-b-[1px] pb-1 w-full border-slate-500 '>
					<div className='flex  justify-center items-center gap-4 pt-10   '>
						<GrRestaurant
							className={`text-green-400 drop-shadow-md text-2xl cursor-pointer `}
						/>
						<h1
							className={`text-green-400 drop-shadow-md origin-left font-medium text-xl duration-200 ${
								!isOpen && 'scale-0'
							}`}
						>
							Fast
						</h1>
					</div>
				</div>
				<ul className='pt-6 flex-1 text-muted-foreground '>
					<NavLink
						to='/'
						className='flex items-center gap-x-4 p-2 drop-shadow-md font-semibold hover:bg-customPurple hover:text-customWhite hover:rounded-md hover:scale-105 transition-transform duration-300'
					>
						<LayoutDashboard />
						<span
							className={` origin-left duration-200 ${!isOpen && 'hidden'}`}
						>
							Dashboard
						</span>
					</NavLink>
					<NavLink
						to='/add'
						className='flex items-center gap-x-4 p-2 mt-4 drop-shadow-md font-semibold  hover:bg-customPurple hover:text-customWhite hover:rounded-md hover:scale-105 transition-transform duration-300 '
					>
						<ImageUpIcon className=' text-xl hover:scale-[1.2]' />
						<span
							className={` origin-left duration-200 ${!isOpen && 'hidden'}`}
						>
							Upload Items
						</span>
					</NavLink>
					<NavLink
						to='/list'
						className='flex items-center gap-x-4 p-2 mt-4 drop-shadow-md font-semibold  hover:bg-customPurple hover:text-customWhite hover:rounded-md hover:scale-105 transition-transform duration-300'
					>
						<ListChecks className=' text-xl hover:scale-[1.2]' />
						<span
							className={` origin-left duration-200 ${!isOpen && 'hidden'}`}
						>
							Items
						</span>
					</NavLink>
					<NavLink
						to='/orders'
						className='flex items-center gap-x-4 p-2 mt-4 drop-shadow-md font-semibold  hover:bg-customPurple hover:text-customWhite hover:rounded-md hover:scale-105 transition-transform duration-300  '
					>
						<ListOrderedIcon className=' text-xl hover:scale-[1.2] ' />
						<span
							className={` origin-left duration-200 ${!isOpen && 'hidden'}`}
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
