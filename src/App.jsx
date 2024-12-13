import { BrowserRouter, Route, Routes } from 'react-router-dom';
import UploadItem from './components/pages/UploadItem';
import FoodList from './components/pages/components/FoodList/FoodList';
import Orders from './components/order/Orders';
import Layout from './components/Layout/Layout';
import WelcomePage from './components/pages/components/WelcomePage';
import Login from './components/LoginPage/Login';
import SignUp from './components/LoginPage/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/element/ProtectedRoute';
import Profile from './components/header/Profile';
import CheckIfAlreadyAuthenticated from './components/CheckIfAlreadyAuthenticated';
import Update from './components/pages/components/FoodList/Update';
import PageNotFound from './components/pages/PageNotFound';
import ScrollToTop from './components/element/ScrollToTop';
import SuperAdminDashboard from './components/Admin/SuperAdminDashboard';
import RestaurantAdminDashboard from './components/Admin/RestaurantAdminDashboard';
import AddRestaurant from './components/Admin/component/pages/AddRestaurant';
import Dashboard from './components/Admin/component/pages/Dashboard';
import AddFood from './components/Admin/component/pages/AddFood';
import AddCategory from './components/Admin/component/pages/AddCategory';
import ManageRestaurant from './components/Admin/component/manage_restaurant/ManageRestaurant';
import ManageFood from './components/Admin/component/pages/manage-food/ManageFood';

function App() {
  return (
    <div className='bg-slate-300 min-h-screen'>
      <ScrollToTop />
      <ToastContainer />
      <AuthProvider>
        <Routes>
          {/* <Route element={<ProtectedRoute />}> */}
          <Route element={<Layout />}>
            <Route index element={<WelcomePage />} />
            <Route path='/add' element={<UploadItem />} />
            <Route path='/list' element={<FoodList />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update/:id' element={<Update />} />
            {/* </Route> */}
          </Route>

          {/* super admin route */}
          <Route>
            <Route path='/super-admin' element={<SuperAdminDashboard />}>
              <Route path='dashboard' element={<Dashboard />} />
              <Route path='manage-restaurant'>
                <Route index element={<ManageRestaurant />} />
                <Route path='add-restaurant' element={<AddRestaurant />} />
              </Route>
              <Route path='manage-food'>
                <Route index element={<ManageFood />} />
                <Route path='add-food' element={<AddFood />} />
              </Route>
              {/* Child route */}
              <Route path=':restaurantName/add-food' element={<AddFood />} />
              <Route
                path=':restaurantName/add-category'
                element={<AddCategory />}
              />
            </Route>
          </Route>

          <Route
            path='/restaurant-admin-dashboard/:restaurantId'
            element={<RestaurantAdminDashboard />}
          />
          <Route path='*' element={<PageNotFound />} />
          {/* <Route element={<CheckIfAlreadyAuthenticated />}> */}
          <Route path='/auth/sign_up' element={<SignUp />} />
          <Route path='/auth/sign_in' element={<Login />} />
          {/* </Route> */}
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
