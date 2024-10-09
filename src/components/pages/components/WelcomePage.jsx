import product from '../../../assets/images/product.png'
export default function WelcomePage() {
	return (
		<div className=' grid grid-cols-4 gap-3 p-2'>
			<div className=' text-white   h-[100px] rounded-md bg-customBlue drop-shadow-md p-3 '>
				<p className='flex items-center  gap-4 p-2'>
					<span className=' block  text-xl pt-'> Products </span>
					{/* <img
						src={product}
						alt='product'
						width={30}
						height={30}
						className='bg-slate-50'
					/> */}
				</p>
				<h2> 20 </h2>
			</div>
			<div className=' bg-customRed text-white  h-[100px] rounded-md  p-3 text-center shadow-lg '>
				<span> Categories </span>
			</div>
			<div className=' text-white  h-[100px] rounded-md bg-customOrange '>
				<span> Today ordered</span>
			</div>
			<div className=' text-white  h-[100px] rounded-md bg-customGreen '>
				<span> Today Revenue</span>
			</div>
		</div>
	)
}
