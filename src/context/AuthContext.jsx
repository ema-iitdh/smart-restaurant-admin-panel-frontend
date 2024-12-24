import useLogout from '@/hooks/api/mutation/useLogout'
import { createContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { socket } from '../components/socket_io/socket'
import useLogin from '@/hooks/api/mutation/useLogin'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [isRestaurantAdmin, setIsRestaurantAdmin] = useState(false)
	const { handleLogin, loginPending, loginIsError, loginError } = useLogin()
	const { handleLogout, logoutPending, logoutIsError, logoutError } =
		useLogout()

	const userString = localStorage.getItem('user')

	const userData = useMemo(() => {
		try {
			return JSON.parse(userString)
		} catch (e) {
			console.error('Error parsing user data:', e)
			return null
		}
	}, [userString])

	const [user, setUser] = useState(userData)

	const [isAuthenticated, setIsAuthenticated] = useState(
		!!localStorage.getItem('user')
	)

	useEffect(() => {
		// CONNECTING SOCKET
		socket.on('connect', () => {
			console.log('connected')
		})
	}, [])

	useEffect(() => {
		setUser(userData)
		setIsRestaurantAdmin(userData?.role === 'Restaurant_Admin')
		setIsAuthenticated(!!userData)
	}, [userData])

	return (
		<AuthContext.Provider
			value={{
				isRestaurantAdmin,
				handleLogin,
				loginPending,
				loginIsError,
				loginError,
				handleLogout,
				logoutPending,
				logoutIsError,
				logoutError,
				user,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}
export default AuthContext
