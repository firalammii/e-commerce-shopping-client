import { getProduct, prodSliceSelector, productsSelector } from '@/api/slices/admin/productSlice';
import { Dropdown, FlexBetween, FlexColumn } from '@/components/common';
import { ProductDetails, ShoppingCard } from '@/components/shopping-related';
import { sortOptions } from '@/data';
import { useToast } from '@/hooks/use-toast';
import { ArrowUpDown, } from 'lucide-react';
import React, { useMemo, useState, } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Listings = () => {
	const [openProductModal, setOpenProductModal] = useState(false);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { toast } = useToast();

	const { products, totalProds, isLoading, error } = useSelector(prodSliceSelector);

	const handleSort = (e) => {
		const urlParams = new URLSearchParams();
		urlParams.append('sortBy', e.target.value);
		navigate(`/shop/home/?${urlParams.toString()}`);
	};

	const toggleOpenProductModal = () => {
		setOpenProductModal(!openProductModal);
	};
	const handleView = (id) => {
		dispatch(getProduct(id)).then(() => toggleOpenProductModal());
	}
	const newSortOptions = useMemo(() => sortOptions.map(item => ({ ...item, onClick: handleSort })), []);

	return (
		<FlexColumn className='' >
			<ProductDetails open={openProductModal} onOpenChange={toggleOpenProductModal} />
			<FlexBetween className='mb-2 justify-end'>
				<div className='flex items-center  gap-3 ml-auto'>
					<span className='border px-3 py-2 rounded-sm'>
						{totalProds} products
					</span>
					<div className='border rounded-sm text-muted-foreground hover:text-foreground'>
						<Dropdown
							trigger={
								<FlexBetween className='w-full py-2 px-8 gap-2'>
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

			<div className='auto-fit gap-3 overflow-auto'>
				{
					products.map(item => (<ShoppingCard key={item._id} item={item} handleView={handleView} />))
				}
			</div>

		</FlexColumn>
	)
}

export default Listings