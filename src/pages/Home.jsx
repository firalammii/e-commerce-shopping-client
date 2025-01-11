import React from 'react'
import Footer from '../components/common/Footer';

const Home = () => {
	return (
		<section className='h-full flex flex-col gap-5'>
			<header className='p-10'>
				<h2 className='text-3xl font-bold'>Home</h2>
			</header>
			<main className='p-10 flex flex-col gap-3'>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam voluptatem ducimus minus quia est autem! Beatae id excepturi assumenda itaque quas dolorum, nihil obcaecati, corporis, aspernatur veritatis cupiditate. Dolore, maxime!</p>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam voluptatem ducimus minus quia est autem! Beatae id excepturi assumenda itaque quas dolorum, nihil obcaecati, corporis, aspernatur veritatis cupiditate. Dolore, maxime!</p>
			</main>
			<footer className='mt-auto'>
				<Footer />
			</footer>
		</section>
	)
}

export default Home