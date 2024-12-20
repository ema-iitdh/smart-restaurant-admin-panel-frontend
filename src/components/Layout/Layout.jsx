import React from 'react'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router'
import Profile from '../header/Profile'
import ScrollToTop from '../element/ScrollToTop'

export default function Layout() {
	return (
		<>
			<div className='flex flex-row h-[100svh] w-screen  '>
				<SideBar />
				<div className='flex-1 flex-col bg-gray-100	 flex '>
					<Profile />
					<div
						id='main-content'
						className=' flex-1  p-3 overflow-auto h-[100lvh] '
					>
						<Outlet />
					</div>
				</div>
			</div>
		</>
	)
}
