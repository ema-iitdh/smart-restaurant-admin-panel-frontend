import React, { useState } from 'react';
import { Axios } from '../../lib/axiosApi';
import { useNavigate, useNavigation } from 'react-router';
import Login from './Login';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useQuery } from '@tanstack/react-query';
import { v4 } from 'uuid';

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['Super_Admin', 'Restaurant_Admin'], 'Select a valid role'),
  email: z.string().email('Enter a valid email'),
  restaurant: z.string().min(1, 'Restaurant Name is required'),
});

export default function SignUp() {
  const [isSignupSuccessful, setIsSignupSuccessful] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
      restaurant: '',
    },
  });

  const navigate = useNavigate();

  const { data: restauranList } = useQuery({
    queryKey: ['Restaurant-list'],
    queryFn: async () => {
      const response = await Axios.get('/api/restaurant/list');
      return response.data;
    },
  });

  const handleSubmit = async (values) => {
    if (values.role === 'Super_Admin') {
      // biome-ignore lint/performance/noDelete: <explanation>
      delete values.restaurant;
    }
    console.log('values data', values);
    const data = await Axios.post('/api/admin/signup', values, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (data.success) {
      console.log(data);
      setIsSignupSuccessful(true);
      navigate('/auth/sign_in');
    } else {
      navigate('/auth/sign_in');
    }
    console.log('object', values);
  };
  function onsubmit(values) {
    console.log(values);
    handleSubmit(values);
  }
  const selectRole = form.watch('role');

  return (
    <div className='bg-gradient-to-br p-10 from-customBlue to-customPurple min flex flex-row  justify-center items-center min-h-screen '>
      {!isSignupSuccessful ? (
        <div className='flex flex-col gap-3 w-full max-w-md rounded-lg bg-white/90 py-[40px] px-[30px] shadow-md'>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onsubmit)}
              className=' space-y-4 text-customBlack '
            >
              <h2 className='text-center font-medium text-lg'>
                Sign Up for Restaurant Management
              </h2>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Name * </FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Email * </FormLabel>
                    <FormControl>
                      <Input placeholder='Enter your email' {...field} />
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
                    <FormLabel> Password * </FormLabel>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Role * </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='select your role' />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value='Super_Admin'>
                            Super_Admin
                          </SelectItem>
                          <SelectItem value='Restaurant_Admin'>
                            Restaurant_Admin
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='restaurant'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Restaurant Name * </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={selectRole === 'Super_Admin'}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder='select your restaurant name' />
                        </SelectTrigger>
                        <SelectContent>
                          {restauranList?.restaurantNames.map((name) => (
                            <SelectItem value={name} key={name._id || v4()}>
                              {name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type='submit'
                className='w-full bg-emerald-500 hover:bg-emerald-600'
              >
                Sign Up
              </Button>
              <div className='flex gap-2 justify-center items-center	'>
                <span className='font-semibold'>
                  {' '}
                  Already have an account ?
                </span>
                <Link
                  to='/auth/login'
                  className=' font-semibold drop-shadow-md'
                >
                  Login
                </Link>
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
}
