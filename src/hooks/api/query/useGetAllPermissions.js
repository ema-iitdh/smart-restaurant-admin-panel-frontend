import { getAllPermission } from '@/api/apiServices'
import { useQuery } from '@tanstack/react-query'

const useGetAllPermissions = (userId) => {
	return useQuery({
		queryKey: ['permissions', userId],
		queryFn: () => getAllPermission(userId),
	})
}

export default useGetAllPermissions
