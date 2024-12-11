import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from '@/components/ui/sidebar'
import { Axios } from '@/lib/axiosApi'
import { useQuery } from '@tanstack/react-query'

import {
	CookingPot,
	LayoutDashboard,
	LayoutList,
	Settings,
	ShieldCheck,
	Store,
	UserPlus,
} from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Value } from 'sass'

export default function AppSideBar() {
	const [showAlert, setShowAlert] = useState(false)
	const [restaurantName, setRestaurantName] = useState('')

	const location = useLocation()
	const navigate = useNavigate()

	const handleAddFoodClick = () => {
		setShowAlert(true)
	}

	const handleConfirmAddFood = () => {
		if (!restaurantName.trim()) {
			alert('Please enter a valid restaurant name.')
			return
		}

		const originalRestaurantName = restaurantName.trim()
		const formatRestaurantName = originalRestaurantName
			.toLowerCase()
			.replace(/\s+/g, '-')

		setShowAlert(false)
		navigate(
			`/super-admin-dashboard/${encodeURIComponent(
				formatRestaurantName
			)}/add-food`,
			{
				state: { originalRestaurantName },
			}
		)
	}
	const { data: restaurantList } = useQuery({
		queryKey: ['Restaurant-list'],
		queryFn: async () => {
			const response = await Axios.get('/api/restaurant/getall')
			return response.data
		},
	})
	console.log('restaurantList: ', restaurantList)

	return (
		<Sidebar>
			<SidebarContent className=' pt-3 bg-gray-800 text-customWhite'>
				<SidebarGroup>
					<SidebarGroupLabel className='flex gap-3 items-center text-lg text-customWhite font-semibold mb-4'>
						<ShieldCheck size='40' />
						Super Admin
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{[
								{
									title: 'Dashboard',
									url: '/super-admin-dashboard',
									icon: LayoutDashboard,
								},
								{
									title: 'Manage Restaurant',
									url: '/super-admin-dashboard/add_restaurant',
									icon: Store,
								},
								{
									title: 'Add Food',
									url: `/super-admin-dashboard/${
										restaurantName || 'loading ...'
									}/add-food`, // Placeholder URL, actual navigation is handled by the click event
									icon: CookingPot,
								},
								{
									title: 'Add Category',
									url: `/super-admin-dashboard/${restaurantName}/add-category
									`,
									icon: LayoutList,
								},
								{
									title: 'Add Admin',
									url: '#',
									icon: UserPlus,
								},
								{
									title: 'Setting',
									url: '#',
									icon: Settings,
								},
							].map((item) => (
								<SidebarMenuItem
									key={item.title}
									className={`mb-2 rounded-md transition-colors duration-200 ${
										location.pathname === item.url
											? 'bg-gray-200 text-gray-800'
											: 'text-gray-300'
									}`}
								>
									{item.title === 'Add Food' ? (
										<SidebarMenuButton
											onClick={handleAddFoodClick}
											className='flex items-center gap-3 p-2 font-medium cursor-pointer'
										>
											<item.icon className='' />
											<span className='text-md'>{item.title}</span>
										</SidebarMenuButton>
									) : (
										<SidebarMenuButton asChild>
											<NavLink
												to={item.url}
												end
												className='flex items-center gap-3 p-2 font-medium'
											>
												<item.icon className='' />
												<span className='text-md'>{item.title}</span>
											</NavLink>
										</SidebarMenuButton>
									)}
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			{showAlert && (
				<AlertDialog open={showAlert} onOpenChange={setShowAlert}>
					<AlertDialogTrigger asChild>
						<Button className='hidden' />
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle>Enter Restaurant Name</AlertDialogTitle>
							<AlertDialogDescription>
								Please enter the restaurant name to continue.
							</AlertDialogDescription>
						</AlertDialogHeader>
						<div className='mb-4'>
							<Select onValueChange={(value) => setRestaurantName(value)}>
								<SelectTrigger>
									<SelectValue placeholder='Select your restaurant name' />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{restaurantList?.restaurants?.map((restaurant) => (
											<SelectItem value={restaurant.name} key={restaurant._id}>
												{restaurant.name.toLowerCase().replace(/ /g, '_')}
											</SelectItem>
										))}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						<AlertDialogFooter className=' flex flex-row items-center gap-3 justify-end p-3'>
							<AlertDialogAction
								onClick={handleConfirmAddFood}
								className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
							>
								Confirm
							</AlertDialogAction>
							<AlertDialogCancel
								onClick={() => setShowAlert(false)}
								className='px-4 py-2 bg-white text-black border border-gray-300 rounded hover:bg-gray-100 transition'
							>
								Cancel
							</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Sidebar>
	)
}
