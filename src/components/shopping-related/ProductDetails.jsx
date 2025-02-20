import React from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { StarIcon } from 'lucide-react';

import { Avatar, FlexCentered, FlexColumn } from '../common';
import { prodResourceURL } from '@/api/axios';
import { useSelector } from 'react-redux';
import { modalProductSelector } from '@/api/slices/admin/productSlice';
import PropTypes from 'prop-types';

const ProductDetails = React.memo(function ProductDetails ({ added, open, onOpenChange, handleAddToCart }) {

	const modalProduct = useSelector(modalProductSelector);

	const reviews = modalProduct?.reviews?.map(review => {
		const goldenStars = new Array(review.rating).fill({ star: <StarIcon size={16} color='gold' fill='gold' /> }).map((item, index) => (<span key={index}>{item.star}</span>));
		const defaultStars = new Array(5 - review.rating).fill({ star: <StarIcon size={16} color='gray' fill='gray' /> }).map((item, index) => (<span key={index}>{item.star}</span>));
		return (
			<div className='' key={review._id}>
				<div className='flex items-center gap-2 mb-1'>
					<span><Avatar avatarFb={"FB"} avatarURL={prodResourceURL + review.reviewerImg} size={6} /></span>
					<span className='text-md font capitalize'>{review.reviewerName}</span>
				</div>
				<div className='flex items-center gap-0.5 pl-8'>
					{goldenStars}
					{defaultStars}
					<span className='ml-2 text-sm'>({review.rating})</span>
				</div>
				<p className='pl-8'>{review.comment}</p>
			</div>
		);
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[600px] h-[320px]">
				<div className='flex gap-4 w-full h-full'>
					<FlexCentered className='w-1/2 flex p-1 border rounded-lg bg-muted'>
						<img src={prodResourceURL + modalProduct?.imageURL} className='rounded-lg object-contain ' />
					</FlexCentered>

					<DialogHeader>
						<div className=' h-full flex flex-col gap-2 '>
							<DialogTitle className='capitalize'>{modalProduct?.title}</DialogTitle>
							<DialogDescription className='w-full h-12 overflow-auto'>
								{modalProduct?.description}
							</DialogDescription>
							<div className=''>
								<h3 className='text-sm font-bold mb-1'>Reviews</h3>
								<FlexColumn className='h-24 gap-1 overflow-auto'>
									{reviews}
									<div className=''>
										<div className='flex items-center gap-2 mb-1	'>
											<span><Avatar avatarFb={"FB"} size={6} /></span>
											<span className='text-md font capitalize'>john doe</span>
										</div>
										<div className='flex gap-0.5 pl-8'>
											<StarIcon size={16} color='gold' fill='gold' />
											<StarIcon size={16} color='gold' fill='gold' />
											<StarIcon size={16} color='gold' fill='gold' />
											<StarIcon size={16} color='gray' fill='gray' />
											<StarIcon size={16} color='gray' fill='gray' />
										</div>
										<p className='pl-8 tracking-tight '>This product is made iron however is not as strong as common steels</p>
									</div>
									<div className=''>
										<div className='flex items-center gap-2 mb-1'>
											<span><Avatar avatarFb={"FB"} size={6} /></span>
											<span className='text-md font capitalize'>jane doe</span>
										</div>
										<div className='flex gap-0.5 pl-8'>
											<StarIcon size={16} color='gold' fill='gold' />
											<StarIcon size={16} color='gold' fill='gold' />
											<StarIcon size={16} color='gold' fill='gold' />
											<StarIcon size={16} color='gold' fill='gold' />
											<StarIcon size={16} color='gray' fill='gray' />
										</div>
										<p className='pl-8'>the comments</p>
									</div>

								</FlexColumn>
							</div>

							<DialogFooter className='mt-auto'>
								<Button
									onClick={() => handleAddToCart(modalProduct)}
									className='w-full self-end'
								>
									{added(modalProduct?._id) ? "Drop from Cart" : "Add to Cart"}
								</Button>
							</DialogFooter>
						</div>
					</DialogHeader>
				</div>
			</DialogContent>
		</Dialog>

	);
})

ProductDetails.propTypes = {
	added: PropTypes.func,
	handleAddToCart: PropTypes.func,
	onOpenChange: PropTypes.func,
	open: PropTypes.bool
};
export default ProductDetails;