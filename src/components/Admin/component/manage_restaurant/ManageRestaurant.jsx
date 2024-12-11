import { Button } from '@/components/ui/button'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ManageRestaurant() {
	return (
		<div>
			<NavLink to='/restaurant'>
				<Button> Add Restaurant </Button>
			</NavLink>
		</div>
	)
}
