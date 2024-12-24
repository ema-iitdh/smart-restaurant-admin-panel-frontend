import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { forwardRef } from 'react'
import { deletePermission } from '@/api/apiServices'

const DeleteDialog = forwardRef(
	({ closeDropdown, permissionIds, userId, isLoading }, ref) => {
		// Add userId as a prop
		const [isDialogOpen, setIsDialogOpen] = useState(false)
		const queryClient = useQueryClient()
		const formattedPermissionIds = Array.isArray(permissionIds)
			? permissionIds
			: [permissionIds]

		const { mutate, isPending } = useMutation({
			mutationFn: deletePermission, // Change this to deletePermission
			onSuccess: () => {
				toast.success(` deleted successfully`)
				setIsDialogOpen(false)
				queryClient.invalidateQueries({ queryKey: ['permissions'] })
			},
			onError: (error) => {
				toast.error(error.message || ` deletion failed`)
			},
			onSettled: () => {
				closeDropdown()
			},
		})
		if (isLoading) return <div>Loading...</div>

		return (
			<Dialog
				open={isDialogOpen}
				onOpenChange={(open) => {
					setIsDialogOpen(open)
					if (!open) {
						closeDropdown()
					}
				}}
			>
				<DialogTrigger className='bg-rose-500 hover:bg-rose-600 w-full text-slate-100 py-1 px-2 rounded'>
					Delete
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Are you sure you want to delete?</DialogTitle>
						<DialogDescription>
							This action cannot be undone. This will permanently delete and
							remove your data from our servers.
						</DialogDescription>
					</DialogHeader>
					<DialogFooter>
						<Button
							disabled={isPending}
							variant='destructive'
							onClick={() => {
								mutate({
									userId, // Ensure userId is passed correctly
									permissionIds: formattedPermissionIds, // Ensure permissionIds is passed correctly
								})
							}} // Ensure permissionIds is an array
						>
							{isPending ? 'Deleting...' : 'Delete'}
						</Button>
						<DialogClose>Cancel</DialogClose>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		)
	}
)

DeleteDialog.displayName = 'DeleteDialog'

export default DeleteDialog
