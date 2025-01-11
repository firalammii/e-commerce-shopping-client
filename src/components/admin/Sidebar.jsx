import React from 'react'
import { useNavigate } from 'react-router-dom';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { LayoutDashboard, NotebookPen, ShoppingBasket, UserCog } from 'lucide-react';

const iconSize = 24
const menuDataItems = [
	{
		label: "Dashboard",
		link: "/admin/dashboard",
		icon: <LayoutDashboard size={iconSize} />
	},
	{
		label: "Products",
		link: "/admin/products",
		icon: <ShoppingBasket size={iconSize} />
	},
	{
		label: "Orders",
		link: "/admin/orders",
		icon: <NotebookPen size={iconSize} />
	},
]
const style = 'flex gap-3 items-center text-muted-foreground hover:text-foreground p-2 cursor-pointer';
const Sidebar = ({openSidebar, onOpenChange}) => {

	const navigate = useNavigate();

	const handleNavClick=(link)=>{
		navigate(link);
		onOpenChange();
	}
	const sheetMenuItems =
		menuDataItems.map(({icon, label, link}) =>{ 
			return (
				<SheetDescription 
					key={label}
					className={style}
					onClick={() => handleNavClick(link)}
				>
					{icon} 
					{label}
				</SheetDescription>
			)
		})
	const menuItems =
		menuDataItems.map(({icon, label, link}) =>{ 
			return (
				<div 
					key={label}
					className={style}
					onClick={() => navigate(link)}
				>
					{icon} 
					{label}
				</div>
			)
		})
	
	return (
		<section className="hidden w-full px-4 lg:flex flex-col sm:gap-5 bg-background">
			<header
				onClick={() => navigate("/admin/dashboard")}
				className="flex w-64 items-center gap-3 cursor-pointer mt-10"
			>
				<UserCog size={iconSize} />
				<h1 className="text-2xl font-extrabold">Admin Panel</h1>
			</header>

			<div className='lg:hidden'>
				<Sheet open={openSidebar} onOpenChange={onOpenChange}>
					<SheetContent side="left" className='w-64' >
						<div className='flex flex-col gap-2'>
							<SheetHeader className='border-b'>
								<SheetTitle> 
									<div
										onClick={() => handleNavClick('/admin/dashboard')}
										className="flex items-center gap-2 cursor-pointer mb-3"
									>
										<UserCog size={iconSize} />
										<h1 className="text-2xl font-extrabold">Admin Panel</h1>
									</div>
								</SheetTitle>
							</SheetHeader>
							{sheetMenuItems}
						</div>
					</SheetContent>
				</Sheet>
			</div>
			<nav className='flex flex-col gap-2'>
				{menuItems}
			</nav>
		</section>
	)
}

export default Sidebar