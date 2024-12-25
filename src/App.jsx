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
import AddAdmin from './pages/admin/pages/manage-admin/AddAdmin'
import ManageCategory from './pages/admin/pages/manage-category/ManageCategory'
import UpdatePermission from './pages/admin/pages/manage-permission/_component/UpdatePermission'
import Orders from './pages/admin/pages/orders/Orders'
import RestaurantInfo from './pages/admin/pages/restaurant-info/RestaurantInfo'
import OneTimePassword from './pages/admin/pages/one-time-password/OneTimePassword'
import AddCategory from './pages/admin/pages/manage-category/_component/AddCategory'
import UpdateCategory from './pages/admin/pages/manage-category/_component/UpdateCategory'
import EditFood from './pages/admin/pages/manage-food/EditFood'
import CategoryUpdateForm from './pages/admin/pages/manage-category/_component/UpdateCategory'

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
							<Route path='update-food/:foodId' element={<EditFood />} />
						</Route>
						<Route path='manage-admin'>
							<Route index element={<ManageAdmin />} />
							<Route path='add-admin' element={<AddAdmin />} />
						</Route>
						<Route path='manage-permission'>
							<Route index element={<ManagePermission />} />
							<Route path='add-permission' element={<AddPermissionRoute />} />
							<Route
								path='update-permission/:userId/:permissionId'
								element={<UpdatePermission />}
							/>
						</Route>
						<Route path='manage-category'>
							<Route index element={<ManageCategory />} />
							<Route path='add-category' element={<AddCategory />} />
							<Route
								path='update-category/:restaurantId/:categoryId'
								element={<CategoryUpdateForm />}
							/>
						</Route>
						<Route path='restaurant-info'>
							<Route index element={<RestaurantInfo />} />
							{/* <Route path='add-category' element={<AddCategory />} /> */}
						</Route>
						<Route path='orders'>
							<Route index element={<Orders />} />
							{/* <Route path='add-category' element={<AddCategory />} /> */}
						</Route>
						<Route path='otp'>
							<Route index element={<OneTimePassword />} />
							{/* <Route path='add-category' element={<AddCategory />} /> */}
						</Route>
					</Route>

					<Route path='*' element={<PageNotFound />} />
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
