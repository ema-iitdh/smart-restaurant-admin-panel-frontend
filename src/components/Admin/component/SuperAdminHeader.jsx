import { SidebarTrigger } from '@/components/ui/sidebar'
import React from 'react'

export default function SuperAdminHeader() {
	return (
		<div className='bg-customWhite p-3 '>
			<div className='flex items-center'>
				<SidebarTrigger />
				<h2>logo</h2>
			</div>
		</div>
	)
}
