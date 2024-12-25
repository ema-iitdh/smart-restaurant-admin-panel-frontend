import useAuth from '@/components/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import useRestaurantById from '@/hooks/api/query/useRestaurantById'

export default function SuperAdminHeader() {
	const { handleLogout, logoutPending, user } = useAuth()
	const restaurantId = user?.restaurant
	const isRestaurantAdmin = user?.role
	const { data, isLoading } = useRestaurantById({
		restaurantId,
		isRestaurantAdmin,
	})
	// if (isLoading) return <div>Loading...</div>  

	return (
		<div className='bg-customWhite flex items-center justify-between p-2 sticky drop-shadow-md top-0 z-10'>
			<div className='flex items-center gap-6'>
				<SidebarTrigger />
				{!user ? (
					<div className='text-2xl font-bold text-gray-800'>Super Admin</div>
				) : (
					<div className='flex items-center gap-4'>
						<img
							src={data?.restaurant?.logo}
							alt='Restaurant Logo'
							className='h-14 w-14 rounded-full object-cover border-2 border-gray-300 shadow-sm'
						/>
						<div>
							<h2 className='text-xl font-semibold text-gray-700'>
								{data?.restaurant?.name}
							</h2>
							<p className='text-sm text-gray-500'>
								{data?.restaurant?.location}
							</p>
						</div>
					</div>
				)}
			</div>
			{/* Logout Button */}
			<Button
				variant='destructive'
				disabled={logoutPending}
				onClick={handleLogout}
				className='px-4 py-2 text-sm font-medium'
			>
				Logout
			</Button>
		</div>
	)
}
