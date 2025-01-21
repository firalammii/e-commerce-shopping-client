import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import AddProducts from './AddProducts';

import { ShoppingCart } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, productsSelector } from '@/api/slices/admin/productSlice';
import { prodResourceURL } from '@/api/axios';
import { ProductCard } from '@/components/admin';

const initialState = {
	title: '',
	category: [],
	amount: '',
	brand: [],
};
const Products = () => {
	const [openDialogue, setOpenDialogue] = useState(false);
	const [searchTerm, setSearchTerm] = useState(initialState);
	const [editProduct, setEditProduct] = useState(null);
	const products = useSelector(productsSelector);
	const dispatch = useDispatch();
	console.log(products);

	useEffect(() => {
		const urlParams = new URLSearchParams();
		Object.entries(searchTerm).forEach(entry => urlParams.append([entry[0]], entry[[1]]));

		const query = urlParams.toString();
		dispatch(fetchProducts(query)).then((data) => console.log(data));
	}, [])

	useEffect(() => {
		if (editProduct)
			openAddProduct();
	}, [editProduct]);

	console.log(editProduct);
	const openAddProduct = () => {
		setOpenDialogue(true)
	}
	const handleEdit = (product) => {
		console.log(product);
		const category = product.category.map(item => ({ label: item, value: item }));

		setEditProduct({ ...product, category: category });
	}
	const closeAddProduct = ()=> {
		setOpenDialogue(false)
	}
	return (
		<section className='m-5 border-t h-full overflow-auto rounded-xl '>
			<div className='w-full mb-2 sticky top-0 flex justify-end'>
				<Button onClick={openAddProduct}>Add New Product</Button>
			</div>
			<div className='auto-fit gap-3 w-full'>
				{
					products.map((product) => (
						<ProductCard key={product._id} item={product} handleEdit={() => handleEdit(product)} />
					))
				}
			</div>
			{
				openDialogue &&
				<AddProducts editProduct={editProduct} open={openDialogue} close={closeAddProduct} />
			}
		</section>
	)
}

export default Products