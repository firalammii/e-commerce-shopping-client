import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import AddProducts from './AddProducts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
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

const initialState = {
	title: '',
	description: '',
	category: [],
	amount: '',
	brand: '',
};
const Products = () => {
	const [openAddProduct, setOpenAddProduct] = useState(false);
	const [searchTerm, setSearchTerm] = useState(initialState);
	const products = useSelector(productsSelector);
	const dispatch = useDispatch();
	console.log(products);

	useEffect(() => {
		const urlParams = new URLSearchParams();
		Object.entries(searchTerm).forEach(entry => urlParams.append([entry[0]], entry[[1]]));

		const query = urlParams.toString();
		dispatch(fetchProducts(query)).then((data) => console.log(data));
	}, [])

	const handleOpenAddProduct = ()=> {
		// console.log("open")
		setOpenAddProduct(true)
	}
	const handleAddToCart = ()=> {
		console.log("add")
	}
	const closeAddProduct = ()=> {
		setOpenAddProduct(false)
	}
	return (
		<section className='m-5 border-t h-full overflow-auto rounded-xl '>
			<div className='w-full mb-2 sticky top-0 flex justify-end'>
				<Button onClick={handleOpenAddProduct}>Add New Product</Button>
			</div>
			<div className='auto-fit gap-3 w-full'>
				{
					products.map((item, i)=> (
						<Card className='' key={i}>
							<CardHeader >
								<div className='flex justify-between items-center'>
								<CardTitle className='capitalize'>{item.title} </CardTitle>
								<span>{item.amount} pieces left</span>
								</div>
							</CardHeader>
							<CardContent>
								<div className='flex items-center justify-center border rounded-lg bg-muted'>
									<img src={item.imageURL.includes('firebasestorage.googleapis.com/') ? item.imageURL : prodResourceURL + item.imageURL} className='w-48 h-32 object-contain ' />
								</div>
								<CardDescription className='mt-2'>
									{item.description}
								</CardDescription>
								<CardFooter className='flex px-1 mt-3 justify-between text-foreground'>
									<span>${item.price}</span>
									<TooltipProvider>
										<Tooltip>
											<TooltipTrigger onClick={handleAddToCart} className='px-2' ><ShoppingCart size={30} /></TooltipTrigger>
											<TooltipContent>
												<p>Add to Cart</p>
											</TooltipContent>
										</Tooltip>
									</TooltipProvider>
								</CardFooter>
							</CardContent>
						</Card>
					))
				}
				</div>
			<AddProducts open={openAddProduct} close={closeAddProduct} />
		</section>
	)
}

export default Products