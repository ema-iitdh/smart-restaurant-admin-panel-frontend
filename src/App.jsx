import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import CheckIfAlreadyAuthenticated from './components/CheckIfAlreadyAuthenticated'
import Login from './pages/LoginPage/Login'
import SignUp from './pages/LoginPage/SignUp'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/element/ScrollToTop'
import PageNotFound from './components/pageNotFound/PageNotFound'
import AddRestaurant from './pages/admin/pages/manage_restaurant/AddRestaurant'
import Dashboard from './pages/admin/pages/Dashboard'
import SuperAdminDashboard from './pages/admin/SuperAdminDashboard'
import ManageFood from './pages/admin/pages/manage-food/ManageFood'
import ManageAdmin from './pages/admin/pages/manage-admin/ManageAdmin'
import ManageRestaurant from './pages/admin/pages/manage_restaurant/ManageRestaurant'
import AddFood from './pages/admin/pages/manage-food/AddFood'
import ManagePermission from './pages/admin/pages/manage-permission/ManagePermission'
import AddPermissionRoute from './pages/admin/pages/manage-permission/AddPermissionRoute'

function App() {
	return (
		<div className='bg-slate-300 min-h-screen'>
			<ScrollToTop />
			<ToastContainer />
			<AuthProvider>
				<Routes>
					{/* If not logged in  */}
					<Route path='/auth' element={<CheckIfAlreadyAuthenticated />}>
						<Route path='login' element={<Login />} />
					</Route>

					{/* If already logged in */}
					<Route path='/' element={<SuperAdminDashboard />}>
						<Route index path='dashboard' element={<Dashboard />} />
						<Route path='manage-restaurant'>
							<Route index element={<ManageRestaurant />} />
							<Route path='add-restaurant' element={<AddRestaurant />} />
						</Route>
						<Route path='manage-food'>
							<Route index element={<ManageFood />} />
							<Route path='add-food' element={<AddFood />} />
						</Route>
						<Route path='manage-admin'>
							<Route index element={<ManageAdmin />} />
							<Route path='add-admin' element={<SignUp />} />
						</Route>
						<Route path='manage-permission'>
							<Route index element={<ManagePermission />} />
							<Route path='add-permission' element={<AddPermissionRoute />} />
						</Route>
					</Route>

					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
