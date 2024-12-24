import useAuth from '@/components/hooks/useAuth'
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
	Crown,
	Key,
	LayoutDashboard,
	Salad,
	ShieldCheck,
	ShoppingCart,
	Store,
	UserCog,
	Users,
} from 'lucide-react'
import { NavLink, useLocation } from 'react-router-dom'
import SidebarSkeletonLoading from './SidebarSkeletonLoading'
import { useState } from 'react'

export default function AppSideBar() {
	const location = useLocation()
	const { user } = useAuth()

	const { data: permissions, isLoading } = useQuery({
		queryKey: ['permissions'],
		queryFn: () => Axios.get(`/api/admin/getPermissions/${user._id}`),
	})
	if (isLoading)
		return (
			<div>
				<SidebarSkeletonLoading />
			</div>
		)

	return (
		<Sidebar>
			<SidebarContent className='pt-3 bg-gray-800 text-customWhite'>
				<SidebarGroup>
					<SidebarGroupLabel className='flex gap-3 items-center text-lg text-customWhite font-semibold mb-4'>
						<div className='relative'>
							{user?.role === 'Super_Admin' ? (
								<span className='relative inline-flex'>
									<ShieldCheck size={40} className='text-emerald-500' />
									<Crown
										size={20}
										className='absolute -top-2 -right-2 text-yellow-400'
									/>
								</span>
							) : (
								<div>
									<Store size={40} className='text-blue-500' />
									<Crown
										size={20}
										className='absolute -top-2 -right-2 text-yellow-400'
									/>
								</div>
							)}
						</div>
						{user?.role?.replace('_', ' ')}
					</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{permissions?.data?.permissions?.map((item) => {
								const isActive = location.pathname.includes(item.url)

								const IconComponent =
									{
										Food: Salad,
										dashboard: LayoutDashboard,
										Restaurant: Store,
										Permission: Users,
										Admin: UserCog,
										restaurantInfo: Store,
										Orders: ShoppingCart,
										Authentication: Key,
									}[item.icon] || ShieldCheck

								return (
									<SidebarMenuItem
										key={item.title}
										className={`mb-2 rounded-md transition-colors duration-200 ${
											isActive ? 'bg-gray-200 text-gray-800' : 'text-gray-300'
										}`}
									>
										<SidebarMenuButton asChild>
											<NavLink to={item.url}>
												<IconComponent size={20} />
												<span className='text-md'>{item.title}</span>
											</NavLink>
										</SidebarMenuButton>
									</SidebarMenuItem>
								)
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	)
}
