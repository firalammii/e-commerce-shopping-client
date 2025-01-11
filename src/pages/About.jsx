import React from 'react'
import Footer from '../components/common/Footer';

const About = () => {
	return (
		<section className='h-screen flex flex-col gap-5'>
			<header>
				<h2 className='text-3xl font-bold'>About</h2>
			</header>
			<main className='flex flex-col gap-3'>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam voluptatem ducimus minus quia est autem! Beatae id excepturi assumenda itaque quas dolorum, nihil obcaecati, corporis, aspernatur veritatis cupiditate. Dolore, maxime!</p>
				<p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam voluptatem ducimus minus quia est autem! Beatae id excepturi assumenda itaque quas dolorum, nihil obcaecati, corporis, aspernatur veritatis cupiditate. Dolore, maxime!</p>
			</main>
			<footer className='mt-auto'>
				<Footer />
			</footer>
		</section>
	)
}

export default About