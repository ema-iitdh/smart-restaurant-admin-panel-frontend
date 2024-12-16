import useAuth from '@/components/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';

export default function SuperAdminHeader() {
  const { handleLogout, logoutPending } = useAuth();

  return (
    <div className='bg-customWhite flex items-center justify-between p-3 sticky drop-shadow-md top-0 z-10'>
      <div className='flex items-center'>
        <SidebarTrigger />
        <h2 className='text-2xl font-bold'>Logo</h2>
      </div>
      {/* Logout Button */}
      <Button
        variant='destructive'
        disabled={logoutPending}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
