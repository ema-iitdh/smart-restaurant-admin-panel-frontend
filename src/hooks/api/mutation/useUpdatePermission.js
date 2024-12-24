import { updatePermission } from '@/api/apiServices'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'

export const useUpdatePermission = () => {
	const queryClient = useQueryClient()
	const navigate = useNavigate()

	return useMutation({
		mutationFn: async ({ values, userId }) => {
			try {
				if (!values) {
					throw new Error('Permissions values cannot be null or undefined')
				}
				await updatePermission({ permissions: [values] }, userId)
			} catch (error) {
				throw new Error(`Failed to update permission: ${error.message}`)
			}
		},
		onSuccess: () => {
			toast.success('Permission updated successfully')
			navigate(-1)
			queryClient.invalidateQueries(['permissions'])
		},
		onError: (error) => {
			console.error('Error updating permission:', error)
			toast.error('Failed to update permission')
		},
	})
}
