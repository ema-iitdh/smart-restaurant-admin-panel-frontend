import { Button } from '@/components/ui/button'
import useGetAllAdmin from '@/hooks/api/query/useGetAllAdmin'
import React from 'react'
import { Link } from 'react-router-dom'

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { all } from 'axios'
import useGetAllPermissions from '@/hooks/api/query/useGetAllPermissions'
import AllPermissionDataTable from './_component/AllPermissionDataTable'
import {
	Table,
	TableBody,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import SkeletonLoader from '../../component/ui/skeleton-loader'
export default function ManagePermission() {
	const [selectAdmin, setSelectAdmin] = React.useState('')
	const { data: allAdmin, isLoading, isError, error } = useGetAllAdmin()
	console.log('selectAdmin: ', selectAdmin)
	const {
		data: allPermissions,
		isLoading: isLoadingPermissions,
		isError: permissionsError,
		error: permissionsErrorData,
	} = useGetAllPermissions(selectAdmin || undefined, { enabled: !!selectAdmin })

	if (isLoading)
		return (
			//make a skeleton loader using shadcn skeleton loader
			<SkeletonLoader />
		)
	if (isError)
		return (
			<div className='flex justify-center items-center min-h-[200px]'>
				<div className='text-red-500 bg-red-50 px-4 py-3 rounded-lg flex items-center'>
					<svg
						className='w-6 h-6 mr-2'
						fill='none'
						stroke='currentColor'
						viewBox='0 0 24 24'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
						/>
					</svg>
					<span>{error?.response?.data?.message || 'An error occurred'}</span>
				</div>
			</div>
		)

	return (
		<div className='p-4 md:p-8 max-w-7xl mx-auto border border-gray-200 rounded-lg'>
			<div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
				<h1 className='text-2xl md:text-3xl font-bold text-gray-800 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent'>
					Manage Permissions
				</h1>
				<Link to='add-permission'>
					<Button className='bg-primary hover:bg-primary/90 w-full md:w-auto transform transition-all duration-300 hover:scale-105 shadow-lg'>
						<svg
							className='w-5 h-5 mr-2'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M12 6v6m0 0v6m0-6h6m-6 0H6'
							/>
						</svg>
						Add New Permission
					</Button>
				</Link>
			</div>
			<div className='rounded-lg border shadow-sm bg-white overflow-hidden mb-4'>
				<div className='p-4 border-b'>
					<Select value={selectAdmin} onValueChange={setSelectAdmin}>
						<SelectTrigger className='w-full max-w-md mx-auto bg-gray-50 hover:bg-gray-100 transition-colors'>
							<SelectValue placeholder='Select Restaurant and Role' />
						</SelectTrigger>
						<SelectContent>
							{allAdmin?.adminData?.map((admin) => (
								<SelectItem key={admin._id} value={admin._id}>
									{`${admin?.role} | ${admin?.email}`}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>
			</div>
			<div className='rounded-md border'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Title</TableHead>
							<TableHead>Url</TableHead>
							<TableHead>Icons</TableHead>
							<TableHead className='text-right'>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{allPermissions?.permissions.map((permission) => (
							<AllPermissionDataTable
								key={permission._id}
								permission={permission}
								isLoading={isLoadingPermissions}
								isError={permissionsError}
								error={permissionsErrorData}
								userId={selectAdmin}
							/>
						))}
						{!allPermissions?.permissions.length && (
							<tr className='hover:bg-gray-50 transition-colors flex justify-center'>
								<td colSpan='3' className='px-6 py-4 text-center text-gray-500'>
									<div className='flex flex-col justify-center items-center space-y-2'>
										<svg
											className='w-12 h-12 text-gray-400'
											fill='none'
											stroke='currentColor'
											viewBox='0 0 24 24'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												strokeWidth={2}
												d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
											/>
										</svg>
										<p>No permissions found</p>
									</div>
								</td>
							</tr>
						)}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}
