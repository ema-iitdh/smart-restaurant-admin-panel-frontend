import { Button } from '@/components/ui/button'
import { CircleParkingOff } from 'lucide-react'
import React, { useState } from 'react'

export default function Pagination({
	currentPages,
	totalPages,
	onNext,
	onPrev,
}) {
	return (
		<div className='flex justify-center items-center gap-3 p-3'>
			<Button
				onClick={onPrev}
				disabled={currentPages === 1}
				className='cursor-pointer'
			>
				prev
			</Button>
			<span>
				{currentPages} of {totalPages}
			</span>
			<Button
				onClick={() => {
					onNext()
				}}
				disabled={currentPages === totalPages}
				className={`px-4 py-2 ${
					currentPages === totalPages
						? 'bg-gray-200'
						: 'bg-blue-500 text-white hover:bg-blue-600'
				} rounded`}
			>
				next
			</Button>
		</div>
	)
}
