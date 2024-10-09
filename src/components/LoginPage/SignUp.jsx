import React, { useState } from 'react'
import { Axios } from '../../lib/axiosApi'
import { data } from 'autoprefixer'
import { useNavigate, useNavigation } from 'react-router'
import Login from './Login'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

const formSchema = z.object({
	email: z.string().email({
		message: 'Invalid email address',
	}),
	password: z.string().min(8, {
		message: 'Password must be 8 character at least',
	}),
})

export default function SignUp() {
	const [isSignupSuccessful, setIsSignupSuccessful] = useState(false)

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	const navigate = useNavigate()

	//sign up
	const handleSubmit = async (values) => {
		const { data } = await Axios.post('/api/admin/signup', values, {
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(values),
		})
		if (data.success) {
			setIsSignupSuccessful(true)
			navigate('/sign_in')
		} else {
			navigate('/sign_in')
		}
	}
	function onsubmit(values) {
		console.log(values)
		handleSubmit(values)
	}

	return (
		<div
			className='bg-red-300 min flex flex-row  justify-center items-center min-h-screen '
			style={{
				background: `url(
			https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
			)`,
			}}
		>
			{!isSignupSuccessful ? (
				<div className='flex flex-col gap-3 w-full max-w-[350px] rounded-lg bg-slate-400 border-[1px] bg-clip-padding  border-slate-100 backdrop-filter backdrop-blur-lg  bg-opacity-10 py-[40px] px-[30px] shadow-lg'>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onsubmit)}
							className=' space-y-6  '
						>
							<h2 className='text-center font-medium text-slate-100 text-lg'>
								Sign up
							</h2>
							<FormField
								control={form.control}
								name='email'
								render={({ field }) => (
									<FormItem>
										<FormLabel className='text-slate-100'> Email </FormLabel>
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
										<FormLabel className='text-slate-100'> Password </FormLabel>
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
							<Button type='submit' className='w-full'>
								Sign Up
							</Button>
						</form>
					</Form>
				</div>
			) : (
				<Login />
			)}
		</div>
	)
}
