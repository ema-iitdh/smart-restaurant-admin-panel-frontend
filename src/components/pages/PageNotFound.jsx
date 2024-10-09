import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../ui/button'

export default function PageNotFound() {
	return (
		<div className='flex  flex-col justify-center items-center gap-2 pt-[170px] '>
			<div className='text-red-500 text-center  font-medium text-3xl'>
				Page Not Found
			</div>
			<Link to='/'>
				<Button
					className='bg-slate-800 mt-2 px-2 py-2 text-lg rounded-md text-slate-200 hover:bg-slate-700 
        drop-shadow-md'
				>
					go to homepage
				</Button>
			</Link>
		</div>
	)
}
