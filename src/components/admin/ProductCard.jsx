import React from 'react';
import { useDispatch } from 'react-redux';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '../ui/button';
import { prodResourceURL } from '@/api/axios';
import { deleteProduct } from '@/api/slices/admin/productSlice';
import { useToast } from '@/hooks/use-toast';

const ProductCard = ({ item, handleEdit, }) => {

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
		<Card>
			<CardHeader>
				<div className='flex justify-between items-center'>
					<CardTitle className='capitalize'>{item?.title} </CardTitle>
					<span>{item?.amount} {item?.amount > 1 ? "pieces" : "piece"}</span>
				</div>
			</CardHeader>
			<CardContent>
				<div className='flex items-center p-1 justify-center border rounded-lg bg-muted'>
					<img src={item?.imageURL.includes('firebasestorage.googleapis.com/') ? item?.imageURL : prodResourceURL + item?.imageURL} className='w-36 h-40 rounded-lg object-contain ' />
				</div>
				<CardDescription className='mt-2'>
					<div className='flex flex-col gap-3 '>
						<p>{item?.description}</p>
						<span className={!item?.brand ? 'hidden' : 'uppercase text-foreground py-1 px-4 rounded-sm bg-muted w-min'}>{item?.brand}</span>
					</div>
				</CardDescription>
			</CardContent>
			<CardFooter className='flex flex-col gap-1 px-4 text-foreground'>
				<div className='w-full flex justify-between'>
					<span>${item?.price}</span>
					<span className={item?.salePrice > 0 ? "line-through" : "hidden"}>${item?.salePrice}</span>
				</div>
				<div className='w-full flex justify-between'>
					<Button onClick={handleEdit}>Edit</Button>
					<Button onClick={handleDelete}>Delete</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export default ProductCard;