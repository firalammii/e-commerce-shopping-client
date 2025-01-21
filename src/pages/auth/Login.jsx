import React, { useState } from 'react'
import { loginFormControls } from '../../data';
import { FormControls } from '../../components/common';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { loginUser } from '@/api/slices/authSlice';
import { Header } from '@/components/auth';
import { Button } from '@/components/ui/button';

const initialState = {
	email: 'firalammii@gmail.com', password: '123456'
}
const Login = () => {
	const [formData, setFormData] = useState(initialState);

	const dispatch = useDispatch();
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const {email, password } = formData;
		if (email && password)
			dispatch(loginUser(formData))
				.then(({ payload }) => {
					toast({
						title: !payload.success ? "Login Failed" : "Logged In",
						description: payload.message,
						variant: !payload.success ? "destructive" : "",
						success: payload.success,
					});
					if (payload.success) {
						const to = payload?.user?.role ==='admin'? "/admin/dashboard":"/shop/home";
						navigate(to);
					}
				});
	}

	return (
		<section className='w-full flex justify-center'>
			<div className='w-full max-w-md flex flex-col gap-5 justify-center'>
				<Header
					title={"Sign in to your account"}
					subTitle={"Don't have an Account?"}
					link={"register"}
				/>
				<form className='w-full flex flex-col gap-3' onSubmit={handleSubmit}>
					<FormControls formControls={loginFormControls} formData={formData} setFormData={setFormData} />
					<div className='mt-5 w-full flex justify-end'>
						<Button
							type="submit"
							className='px-8'
						>
							Log In
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Login