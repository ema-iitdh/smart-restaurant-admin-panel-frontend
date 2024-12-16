import { Button } from 'flowbite-react';
import { Link } from 'react-router-dom';
import useLogin from '@/hooks/api/mutation/useLogin';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { ClipLoader } from 'react-spinners';
import useAuth from '../hooks/useAuth';

const formSchema = z.object({
  email: z.string().email('Invalid email address', {
    message: 'Please enter a valid email address',
  }),
  password: z.string().min(8, {
    message: ' Password must be 8 character at least..',
  }),
});
export default function Login() {
  const { handleLogin, loginPending } = useAuth();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <div className=' min-h-[100svh] flex items-center justify-center bg-gradient-to-br from-customBlue to-customPurple'>
      <div className='flex flex-col gap-3 w-full max-w-md rounded-lg bg-white/90  py-[40px] px-[30px] shadow-md'>
        <Form
          {...form}
          // method='post'
          // onSubmit={handleLogin}
        >
          <form
            onSubmit={form.handleSubmit(handleLogin)}
            className='space-y-6 text-customBlack	'
          >
            <h2 className='text-center  font-medium text-lg'>
              Login to Restaurant Portal
            </h2>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text'> Email </FormLabel>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Password </FormLabel>
                  <FormControl>
                    <Input type='password' placeholder='Password' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='flex	 items-center gap-2'>
              <Button
                type='submit'
                disabled={loginPending}
                className='w-full bg-emerald-500  hover:bg-emerald-600'
              >
                {loginPending ? (
                  <div className='flex items-center gap-2'>
                    <ClipLoader color='white' size={20} />
                    Please wait...
                  </div>
                ) : (
                  <> Login </>
                )}
              </Button>
            </div>
            <div className='flex gap-2 justify-center items-center	'>
              <span className='font-semibold'> Don't have an account?</span>
              <Link to='/auth/signup' className=' font-semibold drop-shadow-md'>
                Sign Up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
