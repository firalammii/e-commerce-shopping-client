import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FilterXIcon, MenuIcon } from 'lucide-react';
import { iconSize, initialFiltersData, prodFilters } from '@/data';
import { FlexBetween, FlexColumn } from '../common';
import { useDispatch } from 'react-redux';
import { fetchProducts } from '@/api/slices/admin/productSlice';
import { Button } from '../ui/button';
import { Switch } from '../ui/switch';
import PropTypes from 'prop-types';

const filtersFromSession = JSON.parse(sessionStorage.getItem('filters'))

const ClearFilterBtn = ({ onClick, className }) => {
	return (
		<button onClick={onClick} className={`border p-1 rounded-full hover:bg-secondary ${className}`}>
			<FilterXIcon size={iconSize.small} />
		</button>
	);
};

const ShoppingSidebar = () => {

	const contentRef = useRef();
	const sidebarRef = useRef();
	const [filters, setFilters] = useState(filtersFromSession || initialFiltersData);

	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();

	const handleSortBy = useCallback((sortBy) => {
		setFilters({ ...filters, sortBy: sortBy });
	}, [filters]);

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		const sortBy = urlParams.get('sortBy');
		if (sortBy) {
			handleSortBy(sortBy);
		}
	}, [location.search, handleSortBy]);

	useEffect(() => {
		const urlParams = new URLSearchParams();
		Object.keys(filters).forEach(key => {
			if ((filters[key].length) || filters[key])
				urlParams.append(key, filters[key]);
		});
		const searchTerm = urlParams.toString();
		navigate(`${location.pathname}?${searchTerm}`);
		dispatch(fetchProducts(searchTerm));
		sessionStorage.setItem('filters', JSON.stringify(filters))

	}, [filters, dispatch, location.pathname, navigate]);


	const clearFilters = (filter) => {
		if (!filter)
			setFilters(initialFiltersData);
		else setFilters({ ...filters, [filter]: [] });
	};



	const handleSwitch = (e) => {
		console.log(e);
		setFilters({ ...filters, strict: !filters.strict });
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

	const hide = () => {
		sidebarRef.current.classList.toggle("small");
		contentRef.current.classList.toggle("hide");
	};

	const menuItems =
		prodFilters.map(({ title, options }) => (
			<FlexColumn key={title} className='gap-5 px-2' >
				<FlexBetween className='w-3/4 border-b  py-1 pb-2 px-4'>
					<h4 className='text-foreground capitalize '>{title} </h4>
					<ClearFilterBtn onClick={() => clearFilters(title)} />
				</FlexBetween>
				<div className='pl-1 flex flex-wrap gap-1 text-sm'>
					{
						options.map(({ value }) => (
							<div key={value} className='flex items-center gap-1 px-1 '>
								<input
									type='checkbox'
									className='hidden cursor-pointer'
									name={title}
									id={value}
									value={value}
									checked={filters[title].includes(value)}
									onChange={handleFilterSelection}
								/>
								<label
									htmlFor={value}
									className={`border px-3 rounded-3xl capitalize whitespace-nowrap text-sm text-muted-foreground hover:text-foreground cursor-pointer ${filters[title].includes(value) ? 'bg-gray-950 text-gray-300 hover:text-primary-foreground' : ''}`}
								>{value}</label>
							</div>
						))
					}
				</div>
			</FlexColumn>
		));

	return (
		<section
			ref={sidebarRef}
			className={`transition-width duration-500 ease-linear w-80 h-full rounded-md shadow-lg p-2 flex flex-col`}
		>
			<FlexBetween className='border w-min self-end  rounded-md p-1 cursor-pointer hover:bg-muted ' onClick={hide}>
				<MenuIcon className='ml-auto' />
			</FlexBetween>
			<div ref={contentRef} className={`h-full mt-10 transition-transform`}>
				<FlexColumn className='gap-10'>
					<FlexColumn className='gap-3 px-1 py-1 w-3/4 bg-white'>
						<h3 className='pl-3 text-xl tracking-tight'>Filter Criteria</h3>
						<div className='flex items-center gap-3 pl-3'>
							<Switch id='switchMode' checked={filters.strict} onCheckedChange={handleSwitch} />
							<label htmlFor='switchMode' className={!filters.strict ? 'text-muted-foreground cursor-pointer' : 'cursor-pointer'}>Strict mode </label>
						</div>
					</FlexColumn>
					<FlexColumn className='pb-4 gap-10  overflow-y-auto'>
						{menuItems}
					</FlexColumn>
				</FlexColumn>
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

ClearFilterBtn.propTypes = {
	onClick: PropTypes.func.isRequired,
	className: PropTypes.string,
};

export default ShoppingSidebar;