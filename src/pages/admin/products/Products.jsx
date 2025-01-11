import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import AddProducts from './AddProducts';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip"

const products =[
	{ title: 'shoe for sale', description: "This shoe is used for 5 years with any repair and replacement",
		imageUrl: 'http://localhost:5173/../public/images/shoes1.jpg', price: 24.99, amount: 5, category:"Shoes",
	},
	{ title: 'shoe for sale', description: "This shoe is used for 5 years with any repair and replacement",
		imageUrl: 'http://localhost:5173/../public/images/shoes1.jpg', price: 24.99, amount: 5, category:"Shoes",
	},
	{ title: 'shoe for sale', description: "This shoe is used for 5 years with any repair and replacement",
		imageUrl: 'http://localhost:5173/../public/images/shoes1.jpg', price: 24.99, amount: 5, category:"Shoes",
	},
	{ title: 'shoe for sale', description: "This shoe is used for 5 years with any repair and replacement",
		imageUrl: 'http://localhost:5173/../public/images/shoes1.jpg', price: 24.99, amount: 5, category:"Shoes",
	},
	{ title: 'shoe for sale', description: "This shoe is used for 5 years with any repair and replacement",
		imageUrl: 'http://localhost:5173/../public/images/shoes1.jpg', price: 24.99, amount: 5, category:"Shoes",
	},
	{ title: 'shoe for sale', description: "This shoe is used for 5 years with any repair and replacement",
		imageUrl: 'http://localhost:5173/../public/images/shoes1.jpg', price: 24.99, amount: 5, category:"Shoes",
	},
	{ title: 'shoe for sale', description: "This shoe is used for 5 years with any repair and replacement",
		imageUrl: 'http://localhost:5173/../public/images/shoes1.jpg', price: 24.99, amount: 5, category:"Shoes",
	},
]
const Products = () => {
	const [openAddProduct, setOpenAddProduct] = useState(false)
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
		<section className='m-5 border h-full overflow-auto rounded-xl '>
			<div className='w-full sticky top-0 flex justify-end'>
				<Button onClick={handleOpenAddProduct}>Add New Product</Button>
			</div>
			<div className='auto-fit gap-3 w-full border'>
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
								<img src={item.imageUrl} className='rounded-lg object-contain' />
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