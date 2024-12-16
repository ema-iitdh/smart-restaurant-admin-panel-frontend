import { useMutation } from '@tanstack/react-query';
import { logout } from '@/api/apiServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export default function useLogout() {
  const navigate = useNavigate();

  const {
    mutate: handleLogout,
    isPending: logoutPending,
    isError: logoutIsError,
    error: logoutError,
  } = useMutation({
    mutationFn: () => logout(),
    onSuccess: () => {
      localStorage.removeItem('user');
      navigate('/auth/login', { replace: true });
      toast.success('Logout successful');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.response.data.message);
    },
  });

  return { handleLogout, logoutPending, logoutIsError, logoutError };
}
