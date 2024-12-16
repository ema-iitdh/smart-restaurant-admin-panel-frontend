import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import SuperAdminDashboard from './components/Admin/SuperAdminDashboard';
import ManageRestaurant from './components/Admin/component/manage_restaurant/ManageRestaurant';
import AddFood from './components/Admin/component/pages/AddFood';
import AddRestaurant from './components/Admin/component/pages/AddRestaurant';
import Dashboard from './components/Admin/component/pages/Dashboard';
import ManageFood from './components/Admin/component/pages/manage-food/ManageFood';
import CheckIfAlreadyAuthenticated from './components/CheckIfAlreadyAuthenticated';
import Login from './components/LoginPage/Login';
import SignUp from './components/LoginPage/SignUp';
import { AuthProvider } from './components/context/AuthContext';
import ScrollToTop from './components/element/ScrollToTop';
import PageNotFound from './components/pages/PageNotFound';
import ManageAdmin from './pages/admin/manage-admin/ManageAdmin';

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
              <Route index element={<ManageRestaurant z />} />
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
          </Route>

          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
