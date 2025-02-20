import React, { useMemo } from 'react';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FlexColumn } from '../common';
import { prodResourceURL } from '@/api/axios';
import PropTypes from 'prop-types';

const Orders = React.memo(function Orders ({
	open, onOpenChange, orders, handleAddToCart, handleUpdateOrder,
	handleCancel, handleContinue
}) {

	const overall = useMemo(() => {
		if (orders?.length)
			return orders?.map(({ quantity, salePrice }) => (quantity * salePrice))?.reduce((prev, curr) => (curr += prev));
		else return 0;
	}, [orders]);

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-[800px] h-[400px]">
				<DialogHeader>
					<FlexColumn className='border-b'>
						<DialogTitle className='capitalize'>Orders</DialogTitle>
						<DialogDescription>
							Here you decide the quantities for each item
						</DialogDescription>
					</FlexColumn>
				</DialogHeader>
				<FlexColumn className=' gap-3 overflow-auto'>
					<div className='bg-muted p-3 rounded-lg font-bold flex ml-auto'>total: ${overall}</div>
					{
						orders?.map(item => (
							<div key={item._id} className='grid grid-cols-8 gap-4 items-baseline hover:bg-muted p-2 border rounded-xl'>
								<div className='col-span-2'><img src={prodResourceURL + item?.imageURL} className='inline-block rounded-lg max-w-24 max-h-24 object-contain ' /></div>
								<span className=' col-span-2 text-md font-bold'>{item?.title}</span>
								<span className='text-nowrap'>price: {item?.salePrice} x</span>
								<Input className='py-1' value={item?.quantity} onChange={(e) => handleUpdateOrder({ ...item, quantity: e.target.value })} />
								<span className='text-nowrap '>tot: {item?.salePrice * item.quantity}</span>
								<Button onClick={() => handleAddToCart(item)} className='border'>Drop</Button>
							</div>
						))
					}
					<div className='bg-muted p-3 rounded-lg font-bold flex ml-auto'>total: ${overall}</div>
				</FlexColumn>
				<DialogFooter className='mt-auto border'>
					<Button className='w-full self-end' onClick={handleCancel}>Cancel</Button>
					<Button className='w-full self-end' disabled={!(orders && orders.length > 0)} onClick={() => handleContinue(overall)}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
});

Orders.propTypes = {
	added: PropTypes.func,
	handleAddToCart: PropTypes.func,
	onOpenChange: PropTypes.func,
	handleUpdateOrder: PropTypes.func,
	handleContinue: PropTypes.func,
	handleCancel: PropTypes.func,
	open: PropTypes.bool,
	orders: PropTypes.array,
};
export default Orders;