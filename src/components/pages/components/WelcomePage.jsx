import {
	faBox,
	faCartShopping,
	faChartSimple,
	faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
import DashboardChart from './DashboardChart'
import useAuth from '@/components/hooks/useAuth'
import { useFoodList } from '@/components/hooks/useFoodlist'
import { useCategorylist } from '@/components/hooks/useCategorylist'
export default function WelcomePage() {
	const { token } = useAuth()
	console.log(token)
	const { data: foodlist } = useFoodList(token)
	const { data: categorylist } = useCategorylist()
	console.log(categorylist)

	const allProducts = foodlist?.Data.length
	const allCategory = categorylist?.list.length

	return (
		<>
			<h2 className=' text-xl sm:text-3xl text-customPurple font-semibold drop-shadow-lg pb-10 pl-3'>
				Welcome to Dashboard
			</h2>
			<div className='p-3  font-manrope grid grid-cols-1 	 md:grid-cols-2 gap-5 '>
				<DashboardChart />

				<div className='grid grid-cols-2 gap-3 place-content-center md:place-content-start w-full md:p-3 hover:cursor-pointer'>
					<NavLink
						to='/list'
						className='text-slate-950 font-semibold  hover:scale-105 transition-all duration-300 h-[130px] rounded-md bg-customBlue drop-shadow-lg p-3'
					>
						<div className='flex flex-col gap-4 '>
							<span className='text-sm sm:text-md text-customWhite font-sans drop-shadow-md flex justify-between items-center'>
								Products
								<FontAwesomeIcon
									size='lg'
									className='text-customWhite'
									icon={faBox}
								/>
							</span>
							<h2 className=' text-xl md:text-xl text-customWhite font-semibold		 '>
								+ {allProducts}
							</h2>
						</div>
					</NavLink>

					<div className='bg-customDarkblue text-white hover:scale-105 transition-transform duration-300 h-[130px] rounded-md p-3 drop-shadow-lg'>
						<div className='flex flex-col gap-4'>
							<span className='flex  justify-between items-center text-sm sm:text-md text-customWhite drop-shadow-lg '>
								Categories
								<FontAwesomeIcon
									icon={faLayerGroup}
									size='lg'
									className='text-customWhite'
								/>
							</span>
							<h2 className='text-customWhite text-xl md:text-xl drop-shadow-md font-semibold'>
								+ {allCategory}
							</h2>
						</div>
					</div>

					<div className='bg-customPurple	 hover:scale-105 transition-transform duration-300 h-[130px] rounded-md p-3 drop-shadow-lg'>
						<div className=' flex flex-col	 gap-4'>
							<span className=' flex  justify-between items-center  text-sm sm:text-md drop-shadow-md text-customWhite '>
								Total ordered
								<FontAwesomeIcon
									icon={faCartShopping}
									size='lg'
									className='text-customWhite'
								/>
							</span>
							<h2 className='text-customWhite text-xl md:text-xl font-semibold'>
								+1000
							</h2>
						</div>
					</div>

					<div className='bg-customOrange text-customWhite 	 hover:scale-105 transition-transform duration-300 h-[130px] rounded-md p-3 drop-shadow-lg'>
						<div className='flex flex-col gap-4'>
							<span className=' flex justify-between items-center text-sm sm:text-md drop-shadow-md '>
								Total Revenue
								<FontAwesomeIcon
									icon={faChartSimple}
									size='lg'
									className='text-customWhite'
								/>
							</span>
							<h2 className='text-customWhite text-md  md:text-xl font-semibold'>
								₹ 30,000
							</h2>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
