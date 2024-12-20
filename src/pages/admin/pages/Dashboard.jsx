import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
	ClipboardListIcon,
	DollarSignIcon,
	TrendingUpIcon,
	UsersIcon,
} from 'lucide-react'
import {
	CartesianGrid,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'

export default function Dashboard() {
	return (
		<div className='p-6'>
			<h1 className='text-3xl font-bold mb-6'>Restaurant Dashboard</h1>

			<div className='grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'>
				{/* Today's Orders */}
				<Card>
					<CardHeader className='text-sm text-muted-foreground'>
						Today's Orders
					</CardHeader>
					<CardContent>
						<div className='flex items-center'>
							<ClipboardListIcon className='h-5 w-5 text-primary' />
							<span className='ml-2 text-2xl font-semibold'>156</span>
						</div>
					</CardContent>
				</Card>

				{/* Revenue */}
				<Card>
					<CardHeader className='text-sm text-muted-foreground'>
						Revenue
					</CardHeader>
					<CardContent>
						<div className='flex items-center'>
							<DollarSignIcon className='h-5 w-5 text-primary' />
							<span className='ml-2 text-2xl font-semibold'>$2,458</span>
						</div>
					</CardContent>
				</Card>

				{/* Customers */}
				<Card>
					<CardHeader className='text-sm text-muted-foreground'>
						Customers
					</CardHeader>
					<CardContent>
						<div className='flex items-center'>
							<UsersIcon className='h-5 w-5 text-primary' />
							<span className='ml-2 text-2xl font-semibold'>87</span>
						</div>
					</CardContent>
				</Card>

				{/* Growth */}
				<Card>
					<CardHeader className='text-sm text-muted-foreground'>
						Growth
					</CardHeader>
					<CardContent>
						<div className='flex items-center'>
							<TrendingUpIcon className='h-5 w-5 text-primary' />
							<span className='ml-2 text-2xl font-semibold'>+15%</span>
						</div>
					</CardContent>
				</Card>
			</div>
			<div className='mt-6'>
				<Card>
					<CardHeader className='text-sm text-muted-foreground'>
						Sales Overview
					</CardHeader>
					<CardContent>
						<div className='h-[300px]'>
							<ResponsiveContainer width='100%' height='100%'>
								<LineChart
									data={[
										{ month: 'Jan', sales: 4000, orders: 2400 },
										{ month: 'Feb', sales: 3000, orders: 1398 },
										{ month: 'Mar', sales: 5000, orders: 3800 },
										{ month: 'Apr', sales: 2780, orders: 3908 },
										{ month: 'May', sales: 1890, orders: 4800 },
										{ month: 'Jun', sales: 2390, orders: 3800 },
										{ month: 'Jul', sales: 3490, orders: 4300 },
										{ month: 'Aug', sales: 4000, orders: 2400 },
										{ month: 'Sep', sales: 3200, orders: 1398 },
										{ month: 'Oct', sales: 2800, orders: 2800 },
										{ month: 'Nov', sales: 3300, orders: 3200 },
										{ month: 'Dec', sales: 3890, orders: 3800 },
									]}
									margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
								>
									<XAxis dataKey='month' />
									<YAxis />
									<CartesianGrid strokeDasharray='3 3' />
									<Tooltip />
									<Line
										type='monotone'
										dataKey='sales'
										stroke='#8884d8'
										strokeWidth={2}
										dot={{ r: 3 }}
										activeDot={{ r: 8 }}
									/>
									<Line
										type='monotone'
										dataKey='orders'
										stroke='#82ca9d'
										strokeWidth={2}
										dot={{ r: 3 }}
										activeDot={{ r: 8 }}
									/>
								</LineChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
