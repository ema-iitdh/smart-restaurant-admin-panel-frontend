import { logout } from '@/api/apiServices';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { useNavigate } from 'react-router';

export default function SuperAdminHeader() {
  const navigate = useNavigate();

  const { mutate: handleLogout, isPending: isPendingLogout } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate('/auth/sign_in');
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div className='bg-customWhite flex items-center justify-between p-3 sticky drop-shadow-md top-0 z-10'>
      <div className='flex items-center'>
        <SidebarTrigger />
        <h2 className='text-2xl font-bold'>Logo</h2>
      </div>
      {/* Logout Button */}
      <Button
        variant='destructive'
        disabled={isPendingLogout}
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}
