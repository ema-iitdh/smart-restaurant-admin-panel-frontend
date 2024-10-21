import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Pagination from './Pagination'

const itemsPerPages = 5

export default function FoodListTables({ foodList }) {
	console.log(foodList)

	const [currentPages, setCurrentPages] = useState(1)
	const totalpages = Math.ceil((foodList?.Data?.length || 0) / itemsPerPages)

	// Calculate current items correctly
	const currentItems =
		foodList?.Data?.slice(
			(currentPages - 1) * itemsPerPages,
			currentPages * itemsPerPages
		) || []

	return (
		<div className='container mx-auto px-4 font-manrope'>
			<h2 className='text-center py-2 font-medium text-lg drop-shadow-lg text-slate-700'>
				Food Items
			</h2>
			{currentItems.length === 0 ? (
				<div className=' font-medium text-xl text-center flex text-slate-700 mt-[30%] md:mt-[20%] drop-shadow-lg'>
					No Food items uploaded
				</div>
			) : (
				<table className='min-w-full bg-white border border-gray-200'>
					<thead className='bg-gray-100'>
						<tr>
							<th className='py-3 px-6 text-left'>Items</th>
							<th className='py-3 px-6 text-left'>Food Name</th>
							<th className='py-3 px-6 text-left'>Price</th>
							<th className='py-3 px-6 text-left'>Category</th>
							<th className='py-3 px-6 text-left'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{currentItems.map((item, idx) => (
							<tr
								key={idx}
								className='border-b font-medium text-muted-foreground'
							>
								{/* Food Image and Item Name */}
								<td className='py-4 px-6'>
									<div className='flex items-center'>
										<img
											src={item.image}
											alt={item.name}
											className='w-10 h-10 rounded-md object-cover mr-4'
										/>
										<span className='text-sm'>{item.name}</span>
									</div>
								</td>

								{/* Food Name */}
								<td className='py-4 px-6 text-sm'>{item.name}</td>

								{/* Price */}
								<td className='py-4 px-6 text-red-600 text-sm'>
									₹ {item.price}
								</td>

								{/* Category */}
								<td className='py-4 px-6 text-sm'>{item.category}</td>

								{/* Actions */}
								<td className='py-4 px-6'>
									<div className='flex space-x-2'>
										<NavLink to={`/update/${item._id}`}>
											<button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'>
												Edit
												<svg
													className='w-4 h-4 ml-2'
													fill='none'
													stroke='currentColor'
													viewBox='0 0 24 24'
													xmlns='http://www.w3.org/2000/svg'
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														strokeWidth='2'
														d='M11 17l-5-5m0 0l-5-5m5 5H3m18 0h-5m-1 0l-5-5m5 5l5 5'
													/>
												</svg>
											</button>
										</NavLink>
										<button
											onClick={() => handleDelete(item._id)}
											className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded inline-flex items-center'
										>
											Delete
											<svg
												className='w-4 h-4 ml-2'
												fill='none'
												stroke='currentColor'
												viewBox='0 0 24 24'
												xmlns='http://www.w3.org/2000/svg'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth='2'
													d='M6 18L18 6M6 6l12 12'
												/>
											</svg>
										</button>
									</div>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			)}
			<Pagination
				currentPages={currentPages}
				totalPages={totalpages}
				onNext={() => setCurrentPages((prev) => Math.min(prev + 1, totalpages))}
				onPrev={() => setCurrentPages((prev) => Math.max(prev - 1, 1))}
			/>
		</div>
	)
}
