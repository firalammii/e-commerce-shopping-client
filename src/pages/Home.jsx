import React, { useEffect, useState } from 'react';
import Footer from '../components/common/Footer';
import banner1 from '../assets/banner-1.webp';
import banner2 from '../assets/banner-2.webp';
import banner3 from '../assets/banner-3.webp';
import { prodCategories } from '@/data';
import { FlexColumn } from '@/components/common';
import { CarFront, Shirt, SmilePlus, LaptopMinimal, TrainFrontTunnel, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
const slides = [banner1, banner2, banner3];
const icons = {
	Automobiles: <CarFront />,
	Women: < TrainFrontTunnel />,
	Men: <Shirt />,
	Kids: <SmilePlus />,
	Electronics: <LaptopMinimal />,
};
const categories = prodCategories.filter(item => item.main).map(({ label }) => ({ label, icon: icons[label] }));

const Home = () => {
	const [index, setIndex] = useState(1);
	const handleIndex = (inc) => {
		setIndex((prev) => prev + inc < 0 ? slides.length - 1 : (prev + inc) % slides.length);

	};

	useEffect(() => {
		const timer = setInterval(() => { setIndex((prev) => prev + 1 < 0 ? slides.length - 1 : (prev + 1) % slides.length); }, 5000);
		return () => clearInterval(timer);
	}, []);

	// slides.map((slide, i) => (
	// 	<img src={slide} key={i} className={`${index == i ? 'opacity-100' : 'opacity-0'} w-full h-full object-cover transition-opacity duration-1000`} />
	// ));

	return (
		<section className='flex flex-col min-h-screen'>
			<FlexColumn className='gap-5 mb-5 items-center'>
				<div className='mb-5 w-full h-[600px] overflow-hidden relative'>
					<img src={slides[index]} className='w-full h-full object-cover transition-opacity duration-1000' />
					<Button onClick={() => handleIndex(-1)} variant='icon' className='absolute top-1/2 left-0 hover:border bg-background '><ChevronLeft /> </Button>
					<Button onClick={() => handleIndex(1)} variant='icon' className='absolute top-1/2 right-0 hover:border bg-muted'><ChevronRight /> </Button>
				</div>
				<div className='flex justify-center gap-5'>
					{
						categories.map((item) => (
							<div key={item.label} className='p-4 flex flex-col gap-2 items-center hover:border w-36 rounded-lg cursor-pointer'>
								<span> {item.icon}</span>
								<span>{item.label}</span>
							</div>))
					}
				</div>
			</FlexColumn>
			<Footer />
		</section>
	)
}

export default Home