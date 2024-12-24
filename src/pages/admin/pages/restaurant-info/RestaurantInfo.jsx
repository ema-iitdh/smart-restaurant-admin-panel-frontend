import useAuth from '@/components/hooks/useAuth'
import useRestaurantById from '@/hooks/api/query/useRestaurantById'
import React from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'

export default function RestaurantInfo() {
	const { user } = useAuth()
	const restaurantId = user?.restaurant
	const isRestaurantAdmin = user?.role
	const {
		data: restaurant,
		isLoading,
		isError,
	} = useRestaurantById({
		restaurantId,
		isRestaurantAdmin,
	})
	const restaurantInfo = restaurant?.restaurant

	if (isLoading) {
		return (
			<div className='flex items-center justify-center h-screen bg-gray-50'>
				<motion.div
					className='w-16 h-16 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin'
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				/>
			</div>
		)
	}

	if (isError || !restaurant) {
		return (
			<div className='flex items-center justify-center h-screen bg-gray-50'>
				<p className='text-red-500 font-semibold'>
					Failed to load restaurant information.
				</p>
			</div>
		)
	}

	return (
		<div className=' p-8'>
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-4xl font-bold mb-8 text-gray-800'>
					Restaurant Information
				</h1>
				<div className='bg-white rounded-2xl shadow-lg overflow-hidden'>
					{/* Cover Image Section */}
					<div className='relative h-64'>
						<img
							src={restaurantInfo?.coverImage}
							alt='Cover'
							className='w-full h-full object-cover'
						/>
						<div className='absolute bottom-0  left-0 right-0 h-32 bg-gradient-to-t from-black/60 to-transparent' />
					</div>

					{/* Logo and Basic Info */}
					<div className='relative px-8 -mt-20'>
						<div className='bg-white rounded-2xl shadow-lg p-6'>
							<div className='flex items-start gap-6'>
								<img
									src={restaurantInfo?.logo}
									alt='Logo'
									className='w-32 h-32 object-cover rounded-xl shadow-lg'
								/>
								<div className='flex-1 md:flex md:justify-end md:gap-4 items-center'>
									<h2 className='text-lg md:text-3xl font-bold text-gray-800 mb-2'>
										{restaurantInfo?.name}
									</h2>
									<p className='text-gray-600 text-lg'>
										{restaurantInfo?.description}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Details Sections */}
				<div className='p-8 grid gap-8 '>
					{/* Contact Information */}
					<div className='bg-gray-50 shadow-lg rounded-xl p-6'>
						<h3 className='text-2xl font-bold text-gray-800 mb-4'>
							Contact Information
						</h3>
						<div className='grid gap-3 text-lg'>
							<p className='flex items-center gap-2'>
								<span className='text-gray-500'>Email:</span>
								<span className='font-medium'>
									{restaurantInfo?.contact.email}
								</span>
							</p>
							<p className='flex items-center gap-2'>
								<span className='text-gray-500'>Phone:</span>
								<span className='font-medium'>
									{restaurantInfo?.contact.phone}
								</span>
							</p>
							<p className='flex items-center gap-2'>
								<span className='text-gray-500'>Address:</span>
								<span className='font-medium'>
									{restaurantInfo?.contact.address}
								</span>
							</p>
						</div>
					</div>

					{/* Settings */}
					<div className='bg-gray-50 shadow-lg rounded-xl p-6'>
						<h3 className='text-2xl font-bold text-gray-800 mb-4'>Settings</h3>
						<div className='grid gap-3 text-lg'>
							<p className='flex items-center gap-2'>
								<span className='text-gray-500'>Status:</span>
								<Badge
									className={`font-medium px-2  ${
										restaurantInfo?.settings.isActive
											? 'text-green-100 bg-emerald-400 hover:bg-emerald-500 text-sm '
											: 'text-red-200 bg-rose-400 hover:bg-rose-500'
									}`}
								>
									{restaurantInfo?.settings.isActive ? 'Active' : 'Inactive'}
								</Badge>
							</p>
							<p className='flex items-center gap-2'>
								<span className='text-gray-500'>Minimum Order:</span>
								<span className='font-medium'>
									${restaurantInfo?.settings.minimumOrderValue}
								</span>
							</p>
							<p className='flex items-center gap-2'>
								<span className='text-gray-500'>Tax Rate:</span>
								<span className='font-medium'>
									{restaurantInfo?.settings.taxPercentage}%
								</span>
							</p>
						</div>
					</div>

					{/* Timestamps */}
					<div className='text-sm text-gray-500 flex justify-between pt-4 border-t'>
						<p>
							Created:{' '}
							{new Date(restaurantInfo?.createdAt).toLocaleDateString()}
						</p>
						<p>
							Last Updated:{' '}
							{new Date(restaurantInfo?.updatedAt).toLocaleDateString()}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
