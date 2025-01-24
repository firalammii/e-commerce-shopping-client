import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FilterXIcon, MenuIcon } from 'lucide-react';
import { iconSize, initialFiltersData, prodFilters } from '@/data';
import { FlexBetween } from '../common';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/api/slices/admin/productSlice';
import { Button } from '../ui/button';


const ShoppingSidebar = () => {

	const [shoppingSidebarItems, setShoppingSidebarItems] = useState(prodFilters);
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
		navigate(`/shop/home/?${searchTerm}`);
		dispatch(fetchProducts(searchTerm));
	}, [filters]);

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
		setShoppingSidebarItems(prev => prev.map(prevItem => prevItem.label == label ? { ...prevItem, active: !prevItem.active } : { ...prevItem, active: false }));
		// navigate(`/admin/${label}`);
	};

	const ClearFilterBtn = ({ onClick, className }) => {
		return (
			<button onClick={onClick} className={`border p-1 rounded-full hover:bg-secondary ${className}`}>
				<FilterXIcon size={iconSize.small} />
			</button>
		);
	};

	const hide = () => {
		document.getElementById('customer_sidebar').classList.toggle("small");
		document.getElementById('customer_sidebar_content').classList.toggle("hide");
	};

	const menuItems =
		shoppingSidebarItems.map(({ title, options }) => (
			<div key={title} className='flex flex-col gap-5 px-2' >
				<FlexBetween className='w-3/4 border-b  py-1 px-3'>
					<h4 className='text-foreground capitalize'>{title} </h4>
					<ClearFilterBtn onClick={() => clearFilters(title)} />
				</FlexBetween>
				<div className='pl-1 flex flex-wrap gap-1 text-sm'>
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
		));

	return (
		<section id='customer_sidebar' className={`transition-width duration-500 ease-linear  w-80 h-full rounded-md shadow-lg  p-2  flex flex-col`}>
			<FlexBetween className='border w-min self-end  rounded-md p-1 cursor-pointer hover:bg-muted ' onClick={hide}>
				<MenuIcon className='ml-auto' />
			</FlexBetween>
			<div id='customer_sidebar_content' className={'h-full grid mt-10'}>
				<div className='flex flex-col gap-10'>
					<FlexBetween className='px-1 py-1 w-3/4 bg-white'>
						<h3
							className='pl-3 cursor-pointer text-xl tracking-tight'
							onClick={() => handleSidebarSelection(item.label)}
						>
							Filter Criteria
						</h3>
					</FlexBetween>
					<div className='flex flex-col pb-4 gap-10  overflow-y-auto'>
						{menuItems}
					</div>
				</div>
				<Button
					className='w-full mt-10'
					onClick={() => clearFilters(undefined)}
				>
					Clear All Filters
				</Button>
			</div>

		</section>
	);
};

export default ShoppingSidebar;