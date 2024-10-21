'use client'

import {
	ChartContainer,
	ChartTooltip,
	ChartTooltipContent,
} from '@/components/ui/chart'
import {
	Bar,
	BarChart,
	CartesianGrid,
	XAxis,
	ResponsiveContainer,
} from 'recharts'

const chartData = [
	{ month: 'January', desktop: 186, mobile: 80 },
	{ month: 'February', desktop: 305, mobile: 200 },
	{ month: 'March', desktop: 237, mobile: 120 },
	{ month: 'April', desktop: 73, mobile: 190 },
	{ month: 'May', desktop: 209, mobile: 130 },
	{ month: 'June', desktop: 214, mobile: 140 },
]

const chartConfig = {
	desktop: {
		label: 'Desktop',
		color: '#2563eb',
	},
	mobile: {
		label: 'Mobile',
		color: '#60a5fa',
	},
}

export default function DashboardChart() {
	return (
		<div className='p-2 mt-3 w-full max-w-[400px]  md:max-w-[600px] rounded-sm bg-customSilver shadow-md flex justify-center'>
			<ChartContainer
				config={chartConfig}
				className='	h-[500px] w-full max-w-[600px] p-2 '
			>
				<h2 className='text-[18px] font-semibold text-customDarkblue'>
					{' '}
					overview{' '}
				</h2>
				<BarChart data={chartData}>
					<CartesianGrid vertical={false} />
					<XAxis
						type='category'
						dataKey='month'
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/>
					<ChartTooltip content={<ChartTooltipContent />} />
					<Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
					<Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
				</BarChart>
			</ChartContainer>
		</div>
	)
}
