import { getAllCategories } from '@/api/apiServices'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function useGetALlCategories(restaurantId) {
	return useQuery({
		queryKey: ['categories', restaurantId],
		queryFn: () => getAllCategories(restaurantId),
		staleTime: 5 * 60 * 1000, // 5 minutes
	})
}
