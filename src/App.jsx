import { Route, Routes } from 'react-router-dom'
import UploadItem from './components/pages/UploadItem'
import FoodList from './components/pages/components/FoodList/FoodList'
import Orders from './components/order/Orders'
import Layout from './components/Layout/Layout'
import WelcomePage from './components/pages/components/WelcomePage'
import Login from './components/LoginPage/Login'
import SignUp from './components/LoginPage/SignUp'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import { AuthProvider } from './components/context/AuthContext'
import ProtectedRoute from './components/element/ProtectedRoute'
import Profile from './components/header/Profile'
import CheckIfAlreadyAuthenticated from './components/CheckIfAlreadyAuthenticated'
import Update from './components/pages/components/FoodList/Update'
import PageNotFound from './components/pages/PageNotFound'

function App() {
	return (
		<div className='bg-slate-300 min-h-screen'>
			<ToastContainer />
			<AuthProvider>
				<Routes>
					<Route element={<ProtectedRoute />}>
						<Route element={<Layout />}>
							<Route index element={<WelcomePage />} />
							<Route path='/add' element={<UploadItem />} />
							<Route path='/list' element={<FoodList />} />
							<Route path='/orders' element={<Orders />} />
							<Route path='/profile' element={<Profile />} />
							<Route path='/update/:id' element={<Update />} />
						</Route>
					</Route>
					<Route path='*' element={<PageNotFound />} />
					<Route element={<CheckIfAlreadyAuthenticated />}>
						<Route path='/sign_up' element={<SignUp />} />
						{/* Corrected path */}
						<Route path='/sign_in' element={<Login />} />
					</Route>
				</Routes>
			</AuthProvider>
		</div>
	)
}

export default App
