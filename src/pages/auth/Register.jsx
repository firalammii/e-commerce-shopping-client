import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { FormControls } from '../../components/common';
import { registerFormControls } from '../../data';
import { registerUser } from '../../api/slices/authSlice';
import { Header } from '@/components/auth';
import { Button } from '@/components/ui/button';

const initialState = {
	userName : '', email:'', password:''
}
const Register = () => {
	const [formData, setFormData] = useState(initialState);

	const dispatch = useDispatch();
	const {toast} = useToast();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const {userName, email, password} = formData;
		if (userName&&email&&password){
			dispatch(registerUser(formData)).then(({payload})=> {
				toast({
					title: !payload.success ? "Registration Failed":"Registration",
					description: payload.message,
					variant: !payload.success? "destructive": ""
				})
				if (payload.success) navigate('/auth/login')
			})
		}
	}

	return (
		<section className='w-full flex justify-center'>
			<div className='w-full max-w-md flex flex-col gap-5 justify-center'>
				<Header
					title={"Create a new Account"}
					subTitle={"Already have Account?"}
					link={"login"}
				/>
				<form className='w-full flex flex-col gap-3' onSubmit={handleSubmit}>
					<FormControls formControls={registerFormControls} formData={formData} setFormData={setFormData} />
					<div className='mt-5 w-full flex justify-end'>
						<Button
							type="submit"
							className='px-8'
						>
							Sign Up
						</Button>
					</div>
				</form>
			</div>
		</section>
	)
}

export default Register