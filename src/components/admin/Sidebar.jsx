import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, } from "@/components/ui/sheet";
import { LayoutDashboard, NotebookPen, ShoppingBasket, UserCog, ChevronDown, ChevronUp, FilterXIcon } from 'lucide-react';
import { iconSize, initialFiltersData, menuDataItems } from '@/data';
import { FlexBetween } from '../common';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/api/slices/admin/productSlice';

const icons = {
	dashboard: <LayoutDashboard size={iconSize.small} />,
	products: <ShoppingBasket size={iconSize.medium} />,
	orders: <NotebookPen size={iconSize.medium} />,
	features: <NotebookPen size={iconSize.medium} />,
	sales: <NotebookPen size={iconSize.medium} />,
}

const sidebarItemsData = JSON.parse(sessionStorage.getItem('adminSidebarItems')) || menuDataItems;

const Sidebar = ({openSidebar, onOpenChange}) => {

	const [sidebarItems, setSidebarItems] = useState(sidebarItemsData);
	const [filters, setFilters] = useState(initialFiltersData);
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
			setFilters(initialFiltersData);
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
		setSidebarItems(sidebarItems.map(item => item.label == label ? { ...item, active: true } : { ...item, active: false }));
		sessionStorage.setItem('adminSidebarItems', JSON.stringify(sidebarItems));
		navigate(`/admin/${label}`);
	};

	const ClearFilterBtn = ({ onClick, className }) => {
		return (
			<button onClick={onClick} className={`border p-1 rounded-full hover:bg-secondary ${className}`}>
				<FilterXIcon size={iconSize.small} />
			</button>
		);
	}

	const menuItems =
		sidebarItems.map((item) => {
			const hasDropdown = item.filters && item.filters.length > 0;
			const openDropdown = item.active && hasDropdown;
			return (
				<div key={item.label} className='w-full'>
					<button
						className='relative w-full rounded-lg'
						onClick={() => handleSidebarSelection(item.label)}
					>
						<FlexBetween className={`p-2 hover:text-foreground ${item.active ? "text-foreground bg-background" : "text-muted-foreground"} border rounded-md`}>
							<div className='flex gap-3 items-center'>
								<span>{icons[item.label]}</span>
								<span className='capitalize'>{item.label}</span>
							</div>
							{hasDropdown ?
								item.active ? <ChevronUp /> : <ChevronDown /> : null}
						</FlexBetween>
					</button>
					{
						openDropdown &&
						<div className={openDropdown ? "transition-max-height max-h-96" : 'transition-max-height max-h-0 '}>
							<div className='text-sm flex flex-col pb-4 gap-4 max-h-96 border rounded-md overflow-y-auto'>
								<FlexBetween className='sticky top-0 px-1 py-1 w-11/12 bg-white   border-b'>
										<h3 className='pl-3 cursor-pointer' onClick={() => handleSidebarSelection(item?.label)}>Filter Criteria</h3>
									<ClearFilterBtn onClick={() => clearFilters(undefined)} />
								</FlexBetween>
									{/* {
										Object.keys(item.filters).map((key) => (
											<div key={item.filters[key]} className='flex flex-col gap-2 px-2' >
												<FlexBetween className='w-4/5 border-b  py-1 px-3'>
													<h4 className='text-foreground capitalize'>{item.filters[key]} </h4>
													<ClearFilterBtn onClick={() => clearFilters(item.filters[key])} />
												</FlexBetween>
												<div className='pl-1 flex flex-wrap gap-1 '>
													{
														item.filters[key].map(({ value }) => (
														<div key={value} className='flex items-center gap-1 px-1 '>
																<input type='checkbox' className='hidden cursor-pointer' name={item.filters[key]} id={value} value={value} checked={filters[key]?.includes(value)} onChange={handleFilterSelection} />
																<label htmlFor={value} className={`border px-3 rounded-3xl capitalize whitespace-nowrap text-sm text-muted-foreground hover:text-foreground cursor-pointer ${filters[key]?.includes(value) ? 'bg-gray-950 text-gray-300 hover:text-primary-foreground' : ''}`}>{value}</label>
														</div>
													))
												}
												</div>
										</div>
									))
								} */}
									{item.filters.map(({ title, options }) => (
										<div key={title} className='flex flex-col gap-2 px-2' >
											<FlexBetween className='w-4/5 border-b  py-1 px-3'>
												<h4 className='text-foreground capitalize'>{title} </h4>
												<ClearFilterBtn onClick={() => clearFilters(title)} />
											</FlexBetween>
											<div className='pl-1 flex flex-wrap gap-1 '>
												{
													options.map(({ value }) => (
														<div key={value} className='flex items-center gap-1 px-1 '>
															<input type='checkbox' className='hidden cursor-pointer' name={title} id={value} value={value} checked={filters[title].includes(value)} onChange={handleFilterSelection} />
															<label htmlFor={value} className={`border px-3 rounded-3xl capitalize whitespace-nowrap text-sm text-muted-foreground hover:text-foreground cursor-pointer ${filters[title].includes(value) ? 'bg-gray-950 text-gray-300 hover:text-primary-foreground' : ''}`}>{value}</label>
														</div>
													))
												}
											</div>

										</div>
									))}
							</div>
						</div>
					}
				</div>
			)
		})
	
	return (
		<section className="hidden w-full bg-background px-2 lg:flex flex-col ">
			<header
				onClick={() => navigate("/admin/dashboard")}
				className="flex items-center gap-3 cursor-pointer mt-10 mb-3"
			>
				<UserCog size={iconSize.medium} />
				<h1 className="text-2xl font-extrabold">Admin Panel</h1>
			</header>

			<div className='lg:hidden'>
				<Sheet open={openSidebar} onOpenChange={onOpenChange}>
					<SheetContent side="left" className='w-80 rounded-l-lg' >
						<div className='flex flex-col gap-1'>
							<SheetHeader className='mt-8 mb-2'>
								<SheetTitle> 
									<div
										onClick={() => handleNavClick('/admin/dashboard')}
										className="flex items-center gap-2 mb-2 cursor-pointer"
									>
										<UserCog size={iconSize.medium} />
										<h1 className="text-2xl font-extrabold">Admin Panel</h1>
									</div>
								</SheetTitle>
							</SheetHeader>
							<SheetDescription></SheetDescription>
							{menuItems}
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