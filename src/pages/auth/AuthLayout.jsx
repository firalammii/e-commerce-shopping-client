import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<section className='w-screen min-h-screen flex'>
			<header className='hidden px-12 w-1/2 lg:flex items-center justify-center bg-black'>
				<div className='max-w-md text-primary-foreground space-y-6 text-center'>
					<h1 className='text-4xl font-extrabold tracking-tight'>
						Welcome to E-Commerce Shopping
					</h1>
				</div>
			</header>
			<main className='flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8'>
				<Outlet />
			</main>
		</section>
	)
}

export default AuthLayout