import React, { useState } from 'react'
import { Outlet } from 'react-router-dom';
import { Header, Sidebar } from '../../components/admin';

const AdminLayout = () => {
	const [openSidebar, setOpenSidebar] = useState(false);
	const handleOpenSidebar = () => setOpenSidebar(!openSidebar)
	return (
		<section className='w-full h-full flex'>
			<aside className={openSidebar? 'hidden': 'flex'}>
				<Sidebar
					openSidebar={openSidebar}
					onOpenChange={handleOpenSidebar}
				/>
			</aside>

			<main className='border w-full flex flex-col'>
				<Header onOpenChange={handleOpenSidebar} />
				<Outlet />
			</main>

		</section>
	)
}

export default AdminLayout