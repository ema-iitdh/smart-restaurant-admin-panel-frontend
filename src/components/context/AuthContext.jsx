import { Axios } from '@/lib/axiosApi'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { socket } from '../socket_io/socket'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		localStorage.getItem('token') ? true : false
	)
	const [token, setToken] = useState(null)
	console.log(token)
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	useEffect(() => {
		const checkStatus = () => {
			const tokenFromLocalStorage = localStorage.getItem('token')
			console.log(tokenFromLocalStorage)
			if (tokenFromLocalStorage) {
				console.log('setting true')
				setIsAuthenticated(true)
				setToken(tokenFromLocalStorage)
			} else {
				console.log('setting FALSE')
				setIsAuthenticated(false)
				setToken(null)
			}
		}

		checkStatus()

		// socket io

		socket.on('connect', () => {
			console.log('connected')
		})

		// socket.on('abc', (data) => {
		// 	console.log(data)
		// 	queryClient.invalidateQueries({ queryKey: ['order-list'] })
		// })
		// socket.on('paymentResponse ', (data) => {
		// 	console.log(data)
		// 	queryClient.invalidateQueries({ queryKey: ['order-list'] })
		// })
	}, [])

	const handleSubmit = async (values) => {
		// const formData = new FormData(e.target)

		return await Axios.post('/api/admin/login', values, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
	}
	//Login
	const {
		mutate: handleLogin,
		isPending: loginPending,
		isError: loginIsError,
	} = useMutation({
		mutationKey: ['Login'],
		mutationFn: handleSubmit,
		onSuccess: (data) => {
			console.log(data)
			const token = data?.data?.token
			const email = data?.data?.email
			if (token && email) {
				localStorage.setItem('token', token)
				localStorage.setItem('email', email)
				setIsAuthenticated(true)
				setToken(token)
				toast.success('Login successfully')
				navigate('/', { replace: true })
			} else if (token === null) {
				localStorage.removeItem('token')
				toast.error('Token not Found')
				navigate('/sign_in')
			}
		},
		onError: (error) => {
			console.log(error)
			const errorMessage = error.response?.data?.message || 'Login Failed'
			toast.error(errorMessage)
		},
	})
	//logout

	const {
		mutate: handleLogout,
		isPending: logoutPending,
		isError,
	} = useMutation({
		mutationKey: ['Logout'],
		mutationFn: async () => {
			return await Axios.post(
				'/api/admin/logout',
				{},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			)
		},
		onSuccess: (data) => {
			if (data.data.success === true) {
				toast.success('Logout Successfull')
				localStorage.removeItem('token')
				localStorage.removeItem('email')
				setIsAuthenticated(false)
				setToken(null)

				navigate('/sign_in', { replace: true })
			}
		},
		onError: (data) => {
			console.log(data)
			const responseData = data?.response?.data
			if (responseData?.success !== true && data?.response?.status === 400) {
				toast.error(responseData?.message)
				localStorage.clear()
				setToken(false)
				setIsAuthenticated(false)
			}
		},
	})

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				token,
				handleLogin,
				loginIsError,
				loginPending,
				logoutPending,
				handleLogout,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext
