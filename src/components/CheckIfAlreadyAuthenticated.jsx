import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from './hooks/useAuth';

function CheckIfAlreadyAuthenticated() {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);
  const location = useLocation();
  console.log(location);
  return isAuthenticated ? <Navigate replace to={'/'} /> : <Outlet />;
}

export default CheckIfAlreadyAuthenticated;
