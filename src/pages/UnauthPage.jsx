import React from 'react'

const UnauthPage = () => {
	return (
		<section className='h-full flex gap-5 p-10 bg-black text-yellow-100'>
			<div className='w-1/2 flex flex-col gap-5 p-5'>
				<h2 className='text-3xl font-bold'>You are not authorized</h2>
				<p className='text-1xl font-bold'>admin access is required </p>
				<a href='/home'>goto home</a>
			</div>
		</section>
	)
}

export default UnauthPage