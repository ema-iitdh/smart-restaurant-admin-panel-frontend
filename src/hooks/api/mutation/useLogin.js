import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router'
import { login } from '@/api/apiServices'

export default function useLogin() {
	const navigate = useNavigate()

	const {
		mutate: handleLogin,
		isPending: loginPending,
		isError: loginIsError,
		error: loginError,
	} = useMutation({
		mutationFn: (values) => {
			return login(values)
		},
		onSuccess: (data) => {
			localStorage.setItem('user', JSON.stringify(data?.data))

			if (
				data?.data?.role === 'Super_Admin' ||
				data?.data?.role === 'Restaurant_Admin'
			) {
				navigate('/', { replace: true })
			}
		},
		onError: (error) => {
			toast.error(error.response.data.message)
		},
	})

	return { handleLogin, loginPending, loginIsError, loginError }
}
