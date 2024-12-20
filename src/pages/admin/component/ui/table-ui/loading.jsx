import { Skeleton } from '@/components/ui/skeleton'

export default function TableLoading() {
	return (
		<div className='w-full'>
			{/* Header */}
			<div className='flex items-center justify-between mb-4'>
				<Skeleton className='h-8 w-[200px]' />
				<Skeleton className='h-10 w-[100px]' />
			</div>
			{/* Search and filters */}
			<div className='flex gap-4 mb-6'>
				<Skeleton className='h-10 w-[300px]' />
				<Skeleton className='h-10 w-[150px]' />
			</div>
			{/* Table header */}
			<div className='flex gap-4 mb-4'>
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className='h-8 flex-1' />
				))}
			</div>
			{[...Array(5)].map((_, index) => (
				<div key={index} className='flex gap-4 mb-4'>
					{[...Array(4)].map((_, i) => (
						<Skeleton
							key={i}
							className='h-12 flex-1'
							style={{
								opacity: 1 - index * 0.1,
							}}
						/>
					))}
				</div>
			))}
		</div>
	)
}
