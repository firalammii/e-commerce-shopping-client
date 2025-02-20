import { createOrder } from '@/api/slices/admin/ordersSlice';
import { getProduct, prodSliceSelector, } from '@/api/slices/admin/productSlice';
import { currUserSelector } from '@/api/slices/authSlice';
import { Dropdown, FlexBetween, FlexColumn } from '@/components/common';
import { Orders, ProductDetails, ShoppingCard } from '@/components/shopping-related';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { sortOptions } from '@/data';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpDown, ShoppingCart, } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ordersFromSession = JSON.parse(sessionStorage.getItem('orders')) || [];

const Listings = () => {
	const [openProductModal, setOpenProductModal] = useState(false);
	const [openOrdersModal, setOpenOrdersModal] = useState(false);
	const [orders, setOrders] = useState(ordersFromSession);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { toast } = useToast();

	useEffect(() => {
		sessionStorage.setItem('orders', JSON.stringify(orders));
	}, [orders])

	const { products, totalProds, isLoading, } = useSelector(prodSliceSelector);
	const currUser = useSelector(currUserSelector);

	const handleSort = useCallback((e) => {
		const urlParams = new URLSearchParams();
		urlParams.append('sortBy', e.target.value);
		navigate(`/shop/home/?${urlParams.toString()}`);
	}, [navigate]);

	const orderExists = useCallback((id) => {
		return orders.some(order => order?._id == id);
	}, [orders]);

	const handleAddToCart = useCallback((product) => {
		let exists;
		if (product) {
			if (orderExists(product._id)) {
				exists = true;
				setOrders(orders.filter(order => order?._id != product?._id));
			} else {
				exists = false;
				setOrders([...orders, { ...product, quantity: 1 }]);
			}
			toast({ title: exists ? "Removed" : "Added", description: exists ? "Removing from Cart Success" : "Adding to Cart Success" });
		}
		setOpenProductModal(false);
	}, [orders, orderExists, toast]);

	const handleUpdateOrder = useCallback((product) => {
		if (product) {
			let cpOrders = [...orders];
			let index = cpOrders.findIndex((item) => item._id === product._id);
			cpOrders[index] = product;
			setOrders(cpOrders);
		}
	}, [orders]);

	const handleCancel = useCallback(() => {
		setOrders([]);
		sessionStorage.removeItem('orders');
		setOpenOrdersModal(false);
	}, []);

	const handleContinue = useCallback((overallPrice) => {
		if (overallPrice) {
			const { userName, _id, address } = currUser;
			const order = {
				customer: {
					userName, userId: _id, address,
				},
				items: orders.map(({ _id, quantity, salePrice, }) => ({ productId: _id, quantity, price_pp: salePrice, totalPrice: salePrice * quantity, paid: true })),
				paymentMethod: 'Card',
				paymentStatus: 'paid',
				completed: true,
				totalPrice: overallPrice
			};

			dispatch(createOrder(order));
		}
	}, [dispatch, currUser, orders]);

	const handleView = useCallback((id) => {
		dispatch(getProduct(id))
			.then(() => setOpenProductModal(true));
	}, [dispatch]);

	const newSortOptions = useMemo(() => {
		sortOptions.map(item => ({ ...item, onClick: handleSort }));
	}, [handleSort]);

	// if (isLoading)
	// 	return (<Skeleton className='w-full grid grid-cols-10 gap-4' />)

	return (
		<FlexColumn className='w-full gap-4' >
			<FlexBetween className='justify-end'>
				<div className='flex items-center gap-3 ml-auto'>
					<span className='border px-3 py-1.5 rounded-sm'>
						{totalProds} products
					</span>
					<div
						onClick={() => setOpenOrdersModal(true)}
						className='flex border p-1.5 px-2 hover:bg-muted cursor-pointer rounded-sm '
					>
						<Badge>{orders.length ? `${orders.length} items selected` : 'empty cart'}</Badge>
						<ShoppingCart />
					</div>
					<div className='border rounded-sm text-muted-foreground hover:text-foreground'>
						<Dropdown
							trigger={
								<FlexBetween className='w-full py-1.5 px-8 gap-2'>
									<ArrowUpDown />
									<span>Sort</span>
								</FlexBetween>
							}
							title='Sort By'
							items={newSortOptions}
						/>
					</div>
				</div>
			</FlexBetween>

			<div className='shop-list-h auto-fit overflow-auto'>
				{
					isLoading ?
						(<div className='auto-fit'>
							{
								new Array(15).fill('value').map((el, index) => (<Skeleton key={index} className='w-64 h-[450px]' />))
							}
						</div>) :
						products.length === 0 ?
							(<div className='pl-5'>
								<p className='text-sm'>No Result</p>
							</div>) :
							products.map(item => (
								<ShoppingCard
									added={() => orderExists(item._id)}
									key={item._id}
									item={item}
									handleAddToCart={() => handleAddToCart(item)}
									handleView={() => handleView(item._id)}
								/>))
				}
			</div>

			<ProductDetails
				open={openProductModal}
				onOpenChange={() => setOpenProductModal(false)}
				added={orderExists}
				handleAddToCart={handleAddToCart}
			/>

			<Orders
				open={openOrdersModal}
				onOpenChange={() => setOpenOrdersModal(false)}
				orders={orders}
				handleAddToCart={handleAddToCart}
				handleUpdateOrder={handleUpdateOrder}
				handleCancel={handleCancel}
				handleContinue={handleContinue}
			/>
		</FlexColumn>
	)
}

export default Listings