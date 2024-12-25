import { getAllRestaurantAdmin } from '@/api/apiServices'
import { useQuery } from '@tanstack/react-query'

export default function useGetAllAdmin() {
  return useQuery({
    queryKey: ['admin'],
    queryFn: getAllRestaurantAdmin,
  })
}
