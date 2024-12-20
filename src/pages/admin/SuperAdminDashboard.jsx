import React, { Suspense, useLayoutEffect, useState } from 'react'
import {
	LayoutDashboard,
	Users,
	Settings,
	Activity,
	BarChart3,
	ShieldCheck,
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
} from 'recharts'
import {
	SidebarHeader,
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '../../components/ui/sidebar'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router'
import useAuth from '../../components/hooks/useAuth'
import AppSideBar from './component/ui/AppSideBar'
import SuperAdminHeader from './component/SuperAdminHeader'

// Mock Data
const userGrowthData = [
	{ name: 'Jan', users: 400 },
	{ name: 'Feb', users: 300 },
	{ name: 'Mar', users: 500 },
	{ name: 'Apr', users: 450 },
	{ name: 'May', users: 600 },
	{ name: 'Jun', users: 550 },
]

const recentUsers = [
	{ id: 1, name: 'Emily Johnson', email: 'emily@example.com', role: 'Admin' },
	{ id: 2, name: 'Michael Chen', email: 'michael@example.com', role: 'Editor' },
	{ id: 3, name: 'Sarah Williams', email: 'sarah@example.com', role: 'Viewer' },
]

const systemStats = {
	totalUsers: 1245,
	activeUsers: 873,
	newUsersToday: 42,
	systemUptime: '99.98%',
}

function MainContent() {
	const location = useLocation()

	// The window.scrollTo(0,0) wasn't working because the scroll container is the SidebarInset element, not the window
	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useLayoutEffect(() => {
		const scrollContainer = document.querySelector('.overflow-y-auto')
		if (scrollContainer) {
			scrollContainer.scrollTop = 0
		}
	}, [location.pathname])

	if (location.pathname === '/') {
		return <Navigate to='/dashboard' />
	}

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<main
				id='main-content'
				className='flex-1  px-4  pt-5  sm:px-10 flex flex-col  '
			>
				<Outlet />
			</main>
		</Suspense>
	)
}

const SuperAdminDashboard = () => {
	const { isAuthenticated } = useAuth()

	if (!isAuthenticated) {
		return <Navigate to='/auth/login' />
	}

	return (
		<SidebarProvider>
			{/* <div className='flex w-full h-screen '> */}
			<AppSideBar />
			<SidebarInset className='relative bg-whitedark:bg-gray-900 h-svh overflow-y-auto flex flex-col overflow-x-hidden'>
				<SuperAdminHeader />
				<MainContent />
			</SidebarInset>
			{/* </div> */}
		</SidebarProvider>

		// <div className='flex h-screen bg-gray-100'>
		// 	{/* Sidebar */}
		// 	<div className='w-64 bg-white shadow-md'>
		// 		<div className='p-6 border-b'>
		// 			<h1 className='text-2xl font-bold text-gray-800 flex items-center'>
		// 				<ShieldCheck className='mr-2' /> SuperAdmin
		// 			</h1>
		// 		</div>
		// 		<nav className='p-4'>
		// 			<Button
		// 				variant={activeTab === 'dashboard' ? 'secondary' : 'ghost'}
		// 				className='w-full justify-start mb-2'
		// 				onClick={() => setActiveTab('dashboard')}
		// 			>
		// 				<LayoutDashboard className='mr-2' /> Dashboard
		// 			</Button>
		// 			<Button
		// 				variant={activeTab === 'users' ? 'secondary' : 'ghost'}
		// 				className='w-full justify-start mb-2'
		// 				onClick={() => setActiveTab('users')}
		// 			>
		// 				<Users className='mr-2' /> Users
		// 			</Button>
		// 			<Button
		// 				variant={activeTab === 'activity' ? 'secondary' : 'ghost'}
		// 				className='w-full justify-start mb-2'
		// 				onClick={() => setActiveTab('activity')}
		// 			>
		// 				<Activity className='mr-2' /> Activity Log
		// 			</Button>
		// 			<Button
		// 				variant={activeTab === 'settings' ? 'secondary' : 'ghost'}
		// 				className='w-full justify-start'
		// 				onClick={() => setActiveTab('settings')}
		// 			>
		// 				<Settings className='mr-2' /> System Settings
		// 			</Button>
		// 		</nav>
		// 	</div>

		// 	{/* Main Content */}
		// 	<div className='flex-1 p-8 overflow-y-auto'>
		// 		{activeTab === 'dashboard' && (
		// 			<div>
		// 				<h2 className='text-3xl font-bold mb-6'>Dashboard Overview</h2>

		// 				{/* System Stats */}
		// 				<div className='grid grid-cols-4 gap-4 mb-6'>
		// 					<Card>
		// 						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
		// 							<CardTitle className='text-sm font-medium'>
		// 								Total Users
		// 							</CardTitle>
		// 							<Users className='h-4 w-4 text-muted-foreground' />
		// 						</CardHeader>
		// 						<CardContent>
		// 							<div className='text-2xl font-bold'>
		// 								{systemStats.totalUsers}
		// 							</div>
		// 						</CardContent>
		// 					</Card>
		// 					<Card>
		// 						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
		// 							<CardTitle className='text-sm font-medium'>
		// 								Active Users
		// 							</CardTitle>
		// 							<BarChart3 className='h-4 w-4 text-muted-foreground' />
		// 						</CardHeader>
		// 						<CardContent>
		// 							<div className='text-2xl font-bold'>
		// 								{systemStats.activeUsers}
		// 							</div>
		// 						</CardContent>
		// 					</Card>
		// 					<Card>
		// 						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
		// 							<CardTitle className='text-sm font-medium'>
		// 								New Users Today
		// 							</CardTitle>
		// 							<Users className='h-4 w-4 text-muted-foreground' />
		// 						</CardHeader>
		// 						<CardContent>
		// 							<div className='text-2xl font-bold'>
		// 								{systemStats.newUsersToday}
		// 							</div>
		// 						</CardContent>
		// 					</Card>
		// 					<Card>
		// 						<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
		// 							<CardTitle className='text-sm font-medium'>
		// 								System Uptime
		// 							</CardTitle>
		// 							<Settings className='h-4 w-4 text-muted-foreground' />
		// 						</CardHeader>
		// 						<CardContent>
		// 							<div className='text-2xl font-bold'>
		// 								{systemStats.systemUptime}
		// 							</div>
		// 						</CardContent>
		// 					</Card>
		// 				</div>

		// 				{/* User Growth Chart */}
		// 				<Card className='mb-6'>
		// 					<CardHeader>
		// 						<CardTitle>User Growth</CardTitle>
		// 					</CardHeader>
		// 					<CardContent>
		// 						<ResponsiveContainer width='100%' height={300}>
		// 							<LineChart data={userGrowthData}>
		// 								<XAxis dataKey='name' />
		// 								<YAxis />
		// 								<Tooltip />
		// 								<Line type='monotone' dataKey='users' stroke='#8884d8' />
		// 							</LineChart>
		// 						</ResponsiveContainer>
		// 					</CardContent>
		// 				</Card>

		// 				{/* Recent Users */}
		// 				<Card>
		// 					<CardHeader>
		// 						<CardTitle>Recent Users</CardTitle>
		// 					</CardHeader>
		// 					<CardContent>
		// 						<div className='space-y-4'>
		// 							{recentUsers.map((user) => (
		// 								<div key={user.id} className='flex items-center space-x-4'>
		// 									<Avatar>
		// 										<AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
		// 									</Avatar>
		// 									<div>
		// 										<div className='font-medium'>{user.name}</div>
		// 										<div className='text-sm text-muted-foreground'>
		// 											{user.email}
		// 										</div>
		// 										<div className='text-xs text-gray-500'>{user.role}</div>
		// 									</div>
		// 								</div>
		// 							))}
		// 						</div>
		// 					</CardContent>
		// 				</Card>
		// 			</div>
		// 		)}

		// 		{activeTab === 'users' && (
		// 			<div>
		// 				<h2 className='text-3xl font-bold mb-6'>User Management</h2>
		// 				{/* User management content would go here */}
		// 				<p>Placeholder for user management interface</p>
		// 			</div>
		// 		)}

		// 		{activeTab === 'activity' && (
		// 			<div>
		// 				<h2 className='text-3xl font-bold mb-6'>Activity Log</h2>
		// 				{/* Activity log content would go here */}
		// 				<p>Placeholder for system activity log</p>
		// 			</div>
		// 		)}

		// 		{activeTab === 'settings' && (
		// 			<div>
		// 				<h2 className='text-3xl font-bold mb-6'>System Settings</h2>
		// 				{/* System settings content would go here */}
		// 				<p>Placeholder for system configuration</p>
		// 			</div>
		// 		)}
		// 	</div>
		// </div>
	)
}

export default SuperAdminDashboard
