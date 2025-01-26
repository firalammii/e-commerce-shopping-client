import { fetchProducts, productsSelector } from '@/api/slices/admin/productSlice';
import { Dropdown, FlexBetween, FlexColumn } from '@/components/common';
import { ShoppingCard } from '@/components/shopping-related';
import { initialSearchState, sortOptions } from '@/data';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpDown, SortAsc, SortDesc } from 'lucide-react';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


const Listings = () => {

	const [searchTerm, setSearchTerm] = useState(initialSearchState);

	const dispatch = useDispatch();
	const { toast } = useToast();
	const location = useLocation();

	useEffect(() => {
		const urlParams = new URLSearchParams(location.search);
		let st = {};
		Object.keys(searchTerm).forEach(key => {
			st[key] = urlParams.get(key);
			// console.log(urlParams.get("category"));
			// urlParams.append([entry[0]], entry[[1]]);
		});
		setSearchTerm(st)
		const query = urlParams.toString();
		dispatch(fetchProducts(query));
	}, [location, searchTerm]);

	const products = useSelector(productsSelector);

	const handleSort = (e) => {
		console.log(e.target.value);
	};

	const newSortOptions = useMemo(() => sortOptions.map(item => ({ ...item, onClick: handleSort })), []);

	return (
		<FlexColumn className='' >
			<FlexBetween className='mb-2 justify-end'>
				<div className='border ml-auto rounded-sm'>
					<Dropdown
						trigger={<FlexBetween className='w-full py-2 px-8 gap-2'><ArrowUpDown /> <span>Sort</span></FlexBetween>}
						title='Sort By'
						items={newSortOptions}
					/>
				</div>
			</FlexBetween>
			<div className='auto-fit gap-3 overflow-auto'>
				{
					products.map(item => (<ShoppingCard key={item._id} item={item} />))
				}
			</div>
		</FlexColumn>
	)
}

export default Listings