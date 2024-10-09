import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../ui/form'
import { Input } from '../ui/input'
import { ClipLoader } from 'react-spinners'

const formSchema = z.object({
	email: z.string().email({
		message: 'Invalid email address',
	}),
	password: z.string().min(8, {
		message: ' Password must be 8 character at least..',
	}),
})
export default function Login() {
	const { handleLogin, loginPending, loginIsError } = useAuth()

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	function onsubmit(values) {
		console.log(values)
		handleLogin(values)
	}

	return (
		<div
			className=' min-h-[100svh] flex items-center justify-center'
			style={{
				background: `url(
				https://images.unsplash.com/photo-1554034483-04fda0d3507b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
				)`,
			}}
		>
			<div className='flex flex-col gap-3 w-full max-w-[350px] rounded-lg bg-slate-200 border-[1px] bg-clip-padding   bg-opacity-10 py-[40px] px-[30px] shadow-lg'>
				<Form
					{...form}
					// method='post'
					// onSubmit={handleLogin}
				>
					<form onSubmit={form.handleSubmit(onsubmit)} className='space-y-6'>
						<h2 className='text-center text-slate-100 font-medium text-lg'>
							Login
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
								color='dark'
								className='w-full'
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
							<span className='text-slate-100'> Don't have an account?</span>
							<Link
								to='/sign_up'
								className='text-blue-800 font-semibold drop-shadow-md'
							>
								Sign Up
							</Link>
						</div>
					</form>
				</Form>
			</div>
		</div>
	)
}
