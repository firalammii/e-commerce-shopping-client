import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { ShoppingHeader, ShoppingSidebar } from '@/components/shopping-related';

const ShoppingLayout = () => {
	const [openSidebar, setOpenSidebar] = useState(true);
	const handleOpenSidebar = () => setOpenSidebar(!openSidebar)
	return (
		<section className='h-screen flex overflow-auto'>
			<aside className='sticky top-0'>
				<ShoppingSidebar openSidebar={openSidebar} onOpenChange={handleOpenSidebar} />
			</aside>
			<div className='w-full' >
				<ShoppingHeader />
				<main className='p-4 overflow-hidden'>
					<Outlet />
				</main>
			</div>
		</section>
	)
}

export default ShoppingLayout