import React, { useState } from 'react'
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from 'recharts'
import {
	Users,
	ShoppingBag,
	DollarSign,
	BookOpen,
	Settings,
	LogOut,
} from 'lucide-react'

// Dummy data (replace with actual API calls)
const revenueData = [
	{ month: 'Jan', revenue: 4000, expenses: 2400 },
	{ month: 'Feb', revenue: 3000, expenses: 1398 },
	{ month: 'Mar', revenue: 5000, expenses: 2210 },
	{ month: 'Apr', revenue: 4780, expenses: 2290 },
	{ month: 'May', revenue: 5890, expenses: 3400 },
	{ month: 'Jun', revenue: 4390, expenses: 2500 },
]

const menuItems = [
	{
		id: 1,
		name: 'Margherita Pizza',
		price: 12.99,
		category: 'Pizza',
		sales: 350,
	},
	{ id: 2, name: 'Caesar Salad', price: 8.5, category: 'Salad', sales: 220 },
	{ id: 3, name: 'Beef Burger', price: 14.5, category: 'Burger', sales: 450 },
]

const RestaurantAdminDashboard = () => {
	const [activeSection, setActiveSection] = useState('dashboard')

	const renderDashboard = () => (
		<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
			{/* Key Metrics Cards */}
			<div className='bg-white shadow-md rounded-lg p-4 flex items-center'>
				<DollarSign className='mr-4 text-green-500' />
				<div>
					<h3 className='text-gray-500'>Total Revenue</h3>
					<p className='text-2xl font-bold'>$45,230</p>
				</div>
			</div>

			<div className='bg-white shadow-md rounded-lg p-4 flex items-center'>
				<ShoppingBag className='mr-4 text-blue-500' />
				<div>
					<h3 className='text-gray-500'>Total Orders</h3>
					<p className='text-2xl font-bold'>1,234</p>
				</div>
			</div>

			<div className='bg-white shadow-md rounded-lg p-4 flex items-center'>
				<Users className='mr-4 text-purple-500' />
				<div>
					<h3 className='text-gray-500'>New Customers</h3>
					<p className='text-2xl font-bold'>456</p>
				</div>
			</div>

			<div className='bg-white shadow-md rounded-lg p-4 flex items-center'>
				<BookOpen className='mr-4 text-orange-500' />
				<div>
					<h3 className='text-gray-500'>Menu Items</h3>
					<p className='text-2xl font-bold'>42</p>
				</div>
			</div>

			{/* Revenue Chart */}
			<div className='col-span-full bg-white shadow-md rounded-lg p-4'>
				<h2 className='text-xl font-semibold mb-4'>
					Monthly Revenue vs Expenses
				</h2>
				<ResponsiveContainer width='100%' height={300}>
					<BarChart data={revenueData}>
						<XAxis dataKey='month' />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey='revenue' fill='#8884d8' name='Revenue' />
						<Bar dataKey='expenses' fill='#82ca9d' name='Expenses' />
					</BarChart>
				</ResponsiveContainer>
			</div>

			{/* Top Selling Items */}
			<div className='bg-white shadow-md rounded-lg p-4'>
				<h2 className='text-xl font-semibold mb-4'>Top Selling Items</h2>
				<table className='w-full'>
					<thead>
						<tr className='border-b'>
							<th className='text-left'>Item</th>
							<th className='text-right'>Sales</th>
						</tr>
					</thead>
					<tbody>
						{menuItems
							.sort((a, b) => b.sales - a.sales)
							.map((item) => (
								<tr key={item.id} className='border-b'>
									<td>{item.name}</td>
									<td className='text-right'>{item.sales}</td>
								</tr>
							))}
					</tbody>
				</table>
			</div>
		</div>
	)

	const renderSidebar = () => (
		<div className='bg-gray-800 text-white w-64 min-h-screen p-4'>
			<div className='text-2xl font-bold mb-8 text-center'>
				Restaurant Admin
			</div>

			<nav className='space-y-2'>
				{[
					{ icon: <Users />, label: 'Dashboard', section: 'dashboard' },
					{ icon: <BookOpen />, label: 'Menu Management', section: 'menu' },
					{ icon: <ShoppingBag />, label: 'Orders', section: 'orders' },
					{ icon: <Settings />, label: 'Settings', section: 'settings' },
					{ icon: <LogOut />, label: 'Logout', section: 'logout' },
				].map(({ icon, label, section }) => (
					<button
						key={section}
						className={`w-full flex items-center p-3 rounded ${
							activeSection === section
								? 'bg-gray-700 text-white'
								: 'hover:bg-gray-700'
						}`}
						onClick={() => setActiveSection(section)}
					>
						{React.cloneElement(icon, { className: 'mr-3' })}
						{label}
					</button>
				))}
			</nav>
		</div>
	)

	return (
		<div className='flex'>
			{renderSidebar()}
			<main className='flex-1 bg-gray-100'>{renderDashboard()}</main>
		</div>
	)
}

export default RestaurantAdminDashboard
