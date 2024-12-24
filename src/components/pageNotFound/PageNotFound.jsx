import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion' // You'll need to install framer-motion

export default function PageNotFound() {
	return (
		<div className='min-h-[100svh] bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-4'>
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='text-center'
			>
				<motion.h1
					animate={{ scale: [1, 1.1, 1] }}
					transition={{ duration: 2, repeat: Infinity }}
					className='text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-8'
				>
					404
				</motion.h1>

				<h2 className='text-3xl font-bold text-gray-800 mb-4'>
					Oops! Page Not Found
				</h2>

				<p className='text-gray-600 max-w-md mx-auto mb-8'>
					The page you're looking for seems to have wandered off. Let's get you
					back on track.
				</p>

				<Link to='/'>
					<Button className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transform transition-transform hover:scale-105 shadow-lg'>
						← Return Home
					</Button>
				</Link>

				<div className='mt-12 text-gray-500'>
					Lost? Try checking the navigation menu above
				</div>
			</motion.div>
		</div>
	)
}
