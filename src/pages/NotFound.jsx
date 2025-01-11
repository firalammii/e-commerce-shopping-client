import React from 'react'

const NotFound = () => {
	return (
		<section className='h-full flex gap-5 p-10 bg-black text-yellow-100'>
			<div className='w-1/2 flex flex-col gap-5 p-5'>
				<h2 className='text-3xl font-bold'>Sorry 404, Page Not Found</h2>
				<p className='text-1xl font-bold'>The page you are looking is not found </p>
				<a href='/home'>goto home</a>
			</div>
		</section>
	)
}

export default NotFound