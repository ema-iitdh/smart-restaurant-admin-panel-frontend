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
	const [token, setToken] = useState(localStorage.getItem('token') || null)
	const navigate = useNavigate()
	const queryClient = useQueryClient()

	useEffect(() => {
		const checkStatus = () => {
			const tokenFromLocalStorage = localStorage.getItem('token')
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
			// console.log('data', data)
			const token = data?.data?.token
			// console.log('token', token)
			const role = data?.data?.Data?.Role
			const restaurantId = data?.data.Data?.Restaurant
			// console.log('role', role, 'restaurantId ', restaurantId)
			if (token && role) {
				// console.log('object')
				localStorage.setItem('token', token)
				setIsAuthenticated(true)
				setToken(token)
				// console.log('object')
				toast.success('Login successfully')
				// console.log('object')
				if (role === 'Super_Admin') {
					console.log('navigate')
					navigate('/super-admin-dashboard', { replace: true })
				} else if (data && role === 'Restaurant_Admin') {
					if (restaurantId) {
						navigate(`/restaurant-admin-dashboard/${restaurantId}`)
					}
				}
				return
			}
			if (token === null) {
				localStorage.removeItem('token ')
				setIsAuthenticated(false)
				setToken(null)
				toast.error('Token not Found')
				navigate('/auth/sign_in')
			}
		},
		onError: (error) => {
			const errorMessage = error.response?.data?.message || 'Login Failed'
			toast.error(errorMessage)
		},
	})

	//logout and auto-logout when token expires
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
			if (data?.data.success === true) {
				toast.success('Logout Successfull')
				localStorage.removeItem('token')
				setIsAuthenticated(false)
				setToken(null)

				navigate('/auth/sign_in', { replace: true })
			}
		},
		onError: (data) => {
			const responseData = data?.response?.data
			console.log('logout error', error)
			if (responseData?.success !== true && data?.response?.status === 400) {
				toast.error(responseData?.message)
				localStorage.removeItem('token')
				setToken(null)
				setIsAuthenticated(false)
			}
		},
	})
	useEffect(() => {
		if (token) {
			const tokenParts = token.split('.')
			if (tokenParts.length === 3) {
				try {
					const payload = tokenParts[1]
					const tokenPayload = JSON.parse(
						decodeURIComponent(escape(atob(payload)))
					)

					const expirationTime = tokenPayload.exp * 1000 // Convert to milliseconds
					const currentTime = Date.now()
					if (currentTime > expirationTime) {
						handleLogout()
					} else {
						const timeout = setTimeout(() => {
							handleLogout()
						}, expirationTime - currentTime)
						return () => clearTimeout(timeout)
					}
				} catch (error) {
					console.error('Error decoding token:', error)
					handleLogout()
				}
			} else {
				console.error('Invalid token format.')
				handleLogout()
			}
		} else {
			handleLogout()
		}
	}, [token, handleLogout])

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
