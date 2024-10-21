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
				localStorage.removeItem('token ')
				setIsAuthenticated(false)
				setToken(null)
				toast.error('Token not Found')
				navigate('/sign_in')
			}
		},
		onError: (error) => {
			const errorMessage = error.response?.data?.message || 'Login Failed'
			toast.error(errorMessage)
		},
	})

	//logout and auto-logout when token expires
	const logoutToken = localStorage.getItem('token')
	console.log(logoutToken)
	const {
		mutate: handleLogout,
		isPending: logoutPending,
		isError,
	} = useMutation({
		mutationKey: ['Logout'],
		mutationFn: async () => {
			return await Axios.post('/api/admin/logout', {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${logoutToken}`,
				},
			})
		},
		onSuccess: (data) => {
			if (data?.data.success === true) {
				toast.success('Logout Successfull')
				localStorage.clear()
				setIsAuthenticated(false)
				setToken(null)

				navigate('/sign_in', { replace: true })
			}
		},
		onError: (data) => {
			const responseData = data?.response?.data
			if (responseData?.success !== true && data?.response?.status === 400) {
				toast.error(responseData?.message)
				localStorage.clear()
				setToken(false)
				setIsAuthenticated(false)
			}
		},
	})
	// useEffect(() => {
	// 	if (savetoken) {
	// 		// Ensure token has three parts (header, payload, signature) and is valid
	// 		const tokenParts = savetoken.split('.')
	// 		if (tokenParts.length === 3) {
	// 			try {
	// 				const tokenPayload = JSON.parse(atob(tokenParts[1])) // Decode the payload (second part of JWT)
	// 				const expirationTime = tokenPayload.exp * 1000 // Token expiration time in milliseconds
	// 				const currentTime = Date.now()

	// 				if (currentTime > expirationTime) {
	// 					// If the token is expired, immediately log out
	// 					handleLogout()
	// 				} else {
	// 					// Set a timeout to log out when the token expires
	// 					const timeout = setTimeout(() => {
	// 						handleLogout()
	// 					}, expirationTime - currentTime) // Time remaining until expiration

	// 					return () => clearTimeout(timeout) // Clear the timeout on component unmount
	// 				}
	// 			} catch (error) {
	// 				console.error('Error decoding token:', error)
	// 				handleLogout() // If decoding fails, log out the user
	// 			}
	// 		} else {
	// 			console.error('Invalid token format.')
	// 			handleLogout() // If token doesn't have three parts, it's invalid
	// 		}
	// 	} else {
	// 		// If there's no token, log out the user
	// 		handleLogout()
	// 	}
	// }, [savetoken, handleLogout])

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
