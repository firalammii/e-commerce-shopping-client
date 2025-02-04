import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { prodResourceURL } from '@/api/axios';
import { FlexBetween, FlexCentered, FlexColumn } from '../common';
import { MoreHorizontal, ShoppingCart } from 'lucide-react';

const ShoppingCard = React.memo(({ added, item, handleAddToCart, handleView }) => {
	const [seeDesc, setSeeDesc] = useState(false);

	return (
		<Card title='click to view' >
			<CardHeader onClick={handleView} className='cursor-pointer my-2'>
				<FlexColumn className='gap-4'>
					<FlexBetween className='flex justify-between items-center'>
						<CardTitle className='capitalize'>{item?.title} </CardTitle>
						<span>{item?.amount} {item?.amount > 1 ? "pieces" : "piece"}</span>
					</FlexBetween>
					<FlexCentered className='flex p-1 border rounded-lg bg-muted'>
						<img src={prodResourceURL + item?.imageURL} className='rounded-lg object-contain ' />
					</FlexCentered>
				</FlexColumn>
			</CardHeader>
			<CardContent>
				<CardDescription className='h-36 overflow-auto m'>
					<FlexColumn className='h-full text-foreground overflow-auto'>
						{seeDesc ?
							<span className='mb-2'>{item?.description}</span> :
							<span>{item?.description?.split('.')[0]}</span>}
						<button
							className='bg-muted w-max rounded-3xl'
							onClick={() => setSeeDesc(!seeDesc)}
						>
							<MoreHorizontal />
						</button>
						<FlexBetween >
							<span className='uppercase  py-1 px-4 rounded-sm bg-muted'>{item?.brand}</span>
						</FlexBetween>
						<FlexBetween className='mt-auto'>
							<span className={item?.salePrice < item?.price ? "line-through" : ""}>${item?.price}</span>
							<span className={!(item?.salePrice < item?.price) ? "hidden" : ""}>sale price: ${item?.salePrice}</span>
						</FlexBetween>
					</FlexColumn>
				</CardDescription>
			</CardContent>
			<CardFooter className='flex flex-col gap-1 px-4 text-foreground'>
				<Button className={`w-full flex gap-5 ${added() ? 'bg-green-400' : "bg-black"}`} onClick={() => handleAddToCart(item)}>
					<ShoppingCart />
					<span>{added() ? "Drop from Cart" : "Add to Cart"}</span>
				</Button>
			</CardFooter>
		</Card >
	);
});

export default ShoppingCard;