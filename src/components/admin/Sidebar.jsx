import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet"
import { LayoutDashboard, NotebookPen, ShoppingBasket, UserCog, ChevronDown, ChevronUp, FilterXIcon } from 'lucide-react';
import { brands, prodCategories } from '@/data';
import { FlexBetween } from '../common';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/api/slices/admin/productSlice';


const iconSize = {
	small: 16,
	medium: 24,
};
const menuDataItems = [
	{
		label: "dashboard",
		link: "/admin/dashboard",
		icon: <LayoutDashboard size={iconSize.medium} />,
		active: false,
		filters: [
		]
	},
	{
		label: "products",
		link: "/admin/products",
		icon: <ShoppingBasket size={iconSize.medium} />,
		active: false,
		filters: [
			{
				title: "category",
				options: prodCategories
			},
			{
				title: "brand",
				options: brands
			}
		]
	},
	{
		label: "orders",
		link: "/admin/orders",
		icon: <NotebookPen size={iconSize.medium} />,
		active: false,
		filters: [

		]
	},
]

const initialFilters = {
	category: [],
	brand: [],
	strict: false,
};

const style = 'flex gap-3 items-center text-muted-foreground hover:text-foreground p-2 cursor-pointer';
const Sidebar = ({openSidebar, onOpenChange}) => {

	const [sidebarItems, setSidebarItems] = useState(menuDataItems);
	const [filters, setFilters] = useState(initialFilters);
	const [strict, setStrict] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const urlParams = new URLSearchParams();
		Object.entries(filters).forEach(entry => {
			urlParams.append(entry[0], entry[1]);
		});
		const searchTerm = urlParams.toString();
		navigate(`/admin/products/?${searchTerm}`);
		dispatch(fetchProducts(searchTerm));
	}, [filters])

	const handleNavClick=(link)=>{
		navigate(link);
		onOpenChange();
	}
	const clearFilters = (filter) => {
		if (!filter)
			setFilters(initialFilters);
		else setFilters({ ...filters, [filter]: [] });
	};
	const handleSwitch = (e) => {
		console.log(e);
		setStrict(!strict);
	};
	const handleFilterSelection = (e) => {
		const searchElement = e.target.value;
		const searchKey = e.target.name;
		let copy = [...filters[searchKey]];
		const isSelected = filters[searchKey].includes(searchElement);
		if (isSelected)
			copy = copy.filter(prevItem => prevItem != searchElement);
		else copy.push(searchElement);
		setFilters({ ...filters, [searchKey]: copy });
	};

	const handleSidebarSelection = (label) => {
		setSidebarItems(prev => prev.map(prevItem => prevItem.label == label ? { ...prevItem, active: !prevItem.active } : { ...prevItem, active: false }));
		navigate(`/admin/${label}`);
	};

	const ClearFilterBtn = ({ onClick, className }) => {
		return (
			<button onClick={onClick} className={`border p-1 rounded-full hover:bg-secondary ${className}`}>
				<FilterXIcon size={iconSize.small} />
			</button>
		);
	}
	const sheetMenuItems =
		menuDataItems.map(({ icon, label, link, active, filters, }) => { 
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
		sidebarItems.map((item) => {
			const open = item.active && item.filters && item.filters.length > 0;
			return (
				<div key={item.label} className='w-full'>
					<button
						className='relative w-full rounded-lg'
						onClick={() => handleSidebarSelection(item.label)}
					>
						<FlexBetween className={`p-2  hover:text-foreground ${item.active ? "text-foreground bg-background" : "text-muted-foreground"} border rounded-md`}>
							<div className='flex gap-3 items-center'>
								<span>{item.icon}</span>
								<span className='capitalize'>{item.label}</span>
							</div>
							{item.active ? <ChevronUp /> : <ChevronDown />}
						</FlexBetween>
					</button>
					{
						open &&
						<div className={open ? "transition-max-height max-h-96" : 'transition-max-height max-h-0 '}>
							<div className='text-sm flex flex-col pb-4 gap-1 max-h-96 border rounded-md overflow-auto'>
								<FlexBetween className='sticky top-0 mx-2 pl-2 w-11/12 bg-white  py-1 border-b'>
									<h3 className=' cursor-pointer' onClick={() => handleSidebarSelection(item.label)}>Filter Criteria</h3>
									<ClearFilterBtn onClick={() => clearFilters(undefined)} />
								</FlexBetween>
								{
									item.filters.map(({ title, options }) => (
										<div key={title} className='flex flex-col pl-5' >
											<FlexBetween className='w-48 border-b py-1 mb-2'>
												<h4 className='text-foreground capitalize'>{title} </h4>
												<ClearFilterBtn onClick={() => clearFilters(title)} />
											</FlexBetween>
											<div className='pl-1 flex flex-wrap gap-1 '>
												{
													options.map(({ value }) => (
														<div key={value} className='flex items-center gap-1 px-1 '>
															<input type='checkbox' className='cursor-pointer' name={title} id={value} value={value} checked={filters[title].includes(value)} onChange={handleFilterSelection} />
															<label htmlFor={value} className='capitalize whitespace-nowrap text-sm text-muted-foreground hover:text-foreground cursor-pointer'>{value}</label>
														</div>
													))
												}
											</div>

										</div>
									))
								}
							</div>
						</div>
					}
				</div>
			)
		})
	
	return (
		<section className="hidden w-80 max-w-lg bg-background pl-2 lg:flex flex-col ">
			<header
				onClick={() => navigate("/admin/dashboard")}
				className="flex items-center gap-3 cursor-pointer mt-10 mb-3"
			>
				<UserCog size={iconSize.medium} />
				<h1 className="text-2xl font-extrabold">Admin Panel</h1>
			</header>

			<div className='lg:hidden'>
				<Sheet open={openSidebar} onOpenChange={onOpenChange}>
					<SheetContent side="left" className='w-64 rounded-l-lg' >
						<div className='flex flex-col gap-2'>
							<SheetHeader className='border-b mt-8 mb-5'>
								<SheetTitle> 
									<div
										onClick={() => handleNavClick('/admin/dashboard')}
										className="flex items-center gap-2 cursor-pointer"
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

			<nav className='flex flex-col gap-1'>
				{menuItems}
			</nav>
		</section>
	)
}

export default Sidebar