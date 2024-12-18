import { Suspense, useLayoutEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';
import { SidebarInset, SidebarProvider } from '../ui/sidebar';
import SuperAdminHeader from './component/SuperAdminHeader';
import AppSideBar from './component/ui/AppSideBar';

function MainContent() {
  const location = useLocation();

  // The window.scrollTo(0,0) wasn't working because the scroll container is the SidebarInset element, not the window
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useLayoutEffect(() => {
    const scrollContainer = document.querySelector('.overflow-y-auto');
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [location.pathname]);

  if (location.pathname === '/') {
    return <Navigate to='/dashboard' />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main
        id='main-content'
        className='flex-1  px-4  pt-5  sm:px-10 flex flex-col  '
      >
        <Outlet />
      </main>
    </Suspense>
  );
}

const SuperAdminDashboard = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <SidebarProvider>
      <AppSideBar />
      <SidebarInset className='relative bg-whitedark:bg-gray-900 h-svh overflow-y-auto flex flex-col overflow-x-hidden'>
        <SuperAdminHeader />
        <MainContent />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SuperAdminDashboard;
