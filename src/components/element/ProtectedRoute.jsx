import React from 'react'
import { Navigate, Outlet, Route, redirect } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

export default function ProtectedRoute() {
	const { isAuthenticated } = useAuth()
	console.log('authentication', isAuthenticated)

	return isAuthenticated ? <Outlet /> : <Navigate to='/auth/sign_up' replace />
}
