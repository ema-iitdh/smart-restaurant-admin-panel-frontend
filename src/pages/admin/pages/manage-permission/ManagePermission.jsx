import { Button } from '@/components/ui/button'
import React from 'react'
import { Link } from 'react-router-dom'

export default function ManagePermission() {
	return (
		<div>
			<h1>Manage Permission</h1>
			<Link to='add-permission'>
				<Button>Add Permission</Button>
			</Link>
		</div>
	)
}
