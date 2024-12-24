import React from 'react'
import { Link } from 'react-router-dom'

export default function ManageAdmin() {
	return (
		<div className='container mx-auto p-4'>
			<h1 className='text-2xl font-bold mb-6'>Admin Management</h1>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<div className='bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow'>
					<h2 className='text-xl font-semibold mb-2'>User Management</h2>
					<p className='text-gray-600 mb-4'>
						Manage user accounts and permissions
					</p>
					<Link to='add-admin' className='text-blue-500 hover:text-blue-700'>
						Manage Users →
					</Link>
				</div>
				<div className='bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow'>
					<h2 className='text-xl font-semibold mb-2'>Settings</h2>
					<p className='text-gray-600 mb-4'>Configure system settings</p>
					<a
						href='/admin/settings'
						className='text-blue-500 hover:text-blue-700'
					>
						View Settings →
					</a>
				</div>
				<div className='bg-white p-4 rounded-lg shadow hover:shadow-lg transition-shadow'>
					<h2 className='text-xl font-semibold mb-2'>Reports</h2>
					<p className='text-gray-600 mb-4'>
						View system analytics and reports
					</p>
					<a
						href='/admin/reports'
						className='text-blue-500 hover:text-blue-700'
					>
						View Reports →
					</a>
				</div>
			</div>
		</div>
	)
}
