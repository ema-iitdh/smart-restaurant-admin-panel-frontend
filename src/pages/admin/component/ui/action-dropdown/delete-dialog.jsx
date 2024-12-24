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
import { deletePermission } from '@/api/apiServices'

const DeleteDialog = ({ data, closeDropdown, permissionIds, userId }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false)
	const queryClient = useQueryClient()

	// Ensure permissionIds is always an array
	const formattedPermissionIds = Array.isArray(permissionIds)
		? permissionIds
		: [permissionIds]

	const { mutate, isPending } = useMutation({
		mutationFn: deletePermission,
		onSuccess: () => {
			toast.success('Permissions deleted successfully')
			setIsDialogOpen(false)
			queryClient.invalidateQueries({ queryKey: ['permission'] })
		},
		onError: (error) => {
			toast.error(error.message || 'Deletion failed')
		},
		onSettled: () => {
			closeDropdown()
		},
	})

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
						onClick={() =>
							mutate({
								userId, // Send userId as part of the URL
								permissionIds: formattedPermissionIds, // Send permissionIds as an array
							})
						}
					>
						{isPending ? 'Deleting...' : 'Delete'}
					</Button>
					<DialogClose>Cancel</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default DeleteDialog
