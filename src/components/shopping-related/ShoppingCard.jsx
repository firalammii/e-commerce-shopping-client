import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { prodResourceURL } from '@/api/axios';
import { deleteProduct } from '@/api/slices/admin/productSlice';
import { useToast } from '@/hooks/use-toast';
import { FlexBetween, FlexCentered, FlexColumn } from '../common';
import { MoreHorizontal, ShoppingCart } from 'lucide-react';

const ShoppingCard = ({ item, handleEdit, }) => {
	const [seeDesc, setSeeDesc] = useState(false);
	const dispatch = useDispatch();
	const { toast } = useToast();

	const handleDelete = () => {
		dispatch(deleteProduct(item?._id))
			.then(({ payload }) => toast({
				title: "Deletion Operation Success",
				description: payload.message,
				variant: !payload.success && "destructive",
				success: payload.success
			}))
			.catch(err => toast({
				title: "Deletion Operation Failure",
				description: err.message,
				variant: "destructive"
			}));
	};

	return (
		<Card >
			<CardHeader>
				<FlexBetween className='flex justify-between items-center'>
					<CardTitle className='capitalize'>{item?.title} </CardTitle>
					<span>{item?.amount} {item?.amount > 1 ? "pieces" : "piece"}</span>
				</FlexBetween>
			</CardHeader>
			<CardContent>
				<FlexCentered className='flex p-1 border rounded-lg bg-muted'>
					<img src={prodResourceURL + item?.imageURL} className='w-28 h-32 rounded-lg object-contain ' />
				</FlexCentered>
				<CardDescription className='h-32 overflow-auto mt-2'>
					<FlexColumn className='h-full text-foreground overflow-auto'>

						{seeDesc ?
							<span className='mb-2'>{item?.description}</span> :
							<span>{item?.description.split('.')[0]}</span>}
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
				{/* <FlexBetween> */}
				<Button className='w-full flex gap-5' onClick={handleEdit}>
					<ShoppingCart />
					<span>Add to Cart</span>
				</Button>
				{/* <Button onClick={handleDelete}>{item?.deleted ? "Restore" : "Delete"}</Button> */}
				{/* </FlexBetween> */}
			</CardFooter>
		</Card >
	);
};

export default ShoppingCard;