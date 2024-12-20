import React from 'react'

export default function SidebarSkeletonLoading() {
	return (
		<div className='flex flex-col gap-4 p-4 w-64 h-screen bg-slate-800  shadow-lg animate-pulse'>
			<div className='h-12 bg-gray-200 rounded-md'></div>
			<div className='space-y-3'>
				{[...Array(6)].map((_, index) => (
					<div key={index} className='flex items-center space-x-3'>
						<div className='w-8 h-8 bg-gray-200 rounded-md'></div>
						<div className='h-4 bg-gray-200 rounded w-3/4'></div>
					</div>
				))}
			</div>
			<div className='mt-auto'>
				<div className='flex items-center space-x-3'>
					<div className='w-10 h-10 bg-gray-200 rounded-full'></div>
					<div className='space-y-2'>
						<div className='h-4 bg-gray-200 rounded w-24'></div>
						<div className='h-3 bg-gray-200 rounded w-20'></div>
					</div>
				</div>
			</div>
		</div>
	)
}
