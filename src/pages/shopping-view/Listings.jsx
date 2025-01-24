import { fetchProducts, productsSelector } from '@/api/slices/admin/productSlice';
import { ShoppingCard } from '@/components/shopping-related';
import { initialSearchState } from '@/data';
import { useToast } from '@/hooks/use-toast';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const Listings = () => {

	const [searchTerm, setSearchTerm] = useState(initialSearchState);
	const dispatch = useDispatch();
	const { toast } = useToast();
	useEffect(() => {
		const urlParams = new URLSearchParams();
		Object.entries(searchTerm).forEach(entry => urlParams.append([entry[0]], entry[[1]]));

		const query = urlParams.toString();
		dispatch(fetchProducts(query));
	}, []);

	const products = useSelector(productsSelector);
	console.log(products)
	return (
		<div className=''>
			<div className='auto-fit gap-3 w-full'>
				{
					products.map(item => (<ShoppingCard key={item._id} item={item} />))
				}
			</div>
		</div>
	)
}

export default Listings