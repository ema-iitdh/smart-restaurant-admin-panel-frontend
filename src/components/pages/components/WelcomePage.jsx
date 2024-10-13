import {
	faBox,
	faCartShopping,
	faChartSimple,
	faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'
export default function WelcomePage() {
	return (
		<div className=' grid grid-cols-4 gap-3 p-2 hover:cursor-pointer '>
			<NavLink
				to='/list'
				className=' text-white hover:scale-105 transition-transform duration-300 h-[100px] rounded-md bg-customBlue drop-shadow-lg p-3 '
			>
				<p className='flex items-center justify-between gap-4'>
					<span className=' text-xl drop-shadow-md font-sans  	'>Products</span>

					<FontAwesomeIcon
						size='xl'
						icon={faBox}
						style={{ color: '#dde0e4' }}
					/>
				</p>
			</NavLink>
			<div className=' bg-customRed  text-white hover:scale-105 transition-transform duration-300  h-[100px] rounded-md  p-3  drop-shadow-lg '>
				<div className='flex justify-between items-center'>
					<span className='text-xl drop-shadow-md font-sans'> Categories </span>
					<FontAwesomeIcon
						icon={faLayerGroup}
						size='xl'
						style={{ color: '#dde0e4' }}
					/>
				</div>
			</div>
			<div className=' text-white hover:scale-105 transition-transform duration-300 h-[100px] rounded-md p-3 bg-customOrange drop-shadow-lg'>
				<div className='flex justify-between items-center'>
					<span className='text-xl font-sans drop-shadow-md'>
						{' '}
						Today ordered
					</span>
					<FontAwesomeIcon
						size='xl'
						icon={faCartShopping}
						style={{ color: '#dde0e4' }}
					/>
				</div>
			</div>
			<div className=' text-white hover:scale-105 transition-transform duration-300 h-[100px] rounded-md p-3 bg-customGreen drop-shadow-lg'>
				<div className='flex justify-between items-center'>
					<span className='text-xl font-sans drop-shadow-md'>
						{' '}
						Today Revenue
					</span>
					<FontAwesomeIcon
						size='xl'
						icon={faChartSimple}
						style={{ color: '#dde0e4' }}
					/>
				</div>
			</div>
		</div>
	)
}
