import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

import { ProductCard } from '@/components/admin';
import { FormControls, ImageUploader } from '@/components/common';
import { productsFormControls } from '@/data';
import { addProduct, fetchProducts, productsSelector, updateProduct } from '@/api/slices/admin/productSlice';

const initialFormData = {
	imageURL: '',
	title: '',
	description: '',
	brand: '',
	category: [],
	price: '',
	salePrice: 0,
	amount: 1,
};

const initialSearchState = {
	title: '',
	category: [],
	amount: '',
	brand: [],
};

const Products = () => {
	const [formData, setFormData] = useState(initialFormData);
	const [searchTerm, setSearchTerm] = useState(initialSearchState);
	const [editMode, setEditMode] = useState(false);
	const [openDialogue, setOpenDialogue] = useState(false);

	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [uploadErrorMsg, setUploadErrorMsg] = useState('');

	const products = useSelector(productsSelector);
	const dispatch = useDispatch();
	const { toast } = useToast();

	useEffect(() => {
		const urlParams = new URLSearchParams();
		Object.entries(searchTerm).forEach(entry => urlParams.append([entry[0]], entry[[1]]));

		const query = urlParams.toString();
		dispatch(fetchProducts(query)).then((data) => console.log(data));
	}, [])

	const handleImageUpload = (e) => {
		axios.post('/admin/products/upload-image', { imageFile: e.target.files[0] }, { headers: { "Content-Type": "multipart/form-data" } })
			.then(({ data }) => setFormData({ ...formData, imageURL: data.image.filename }))
			.catch((err) => setUploadErrorMsg(err.message));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const product = { ...formData };
		product.category = formData.category.map(({ value }) => value);
		if (editProduct) {
			dispatch(updateProduct(product))
				.then(({ payload }) => toast({
					title: payload.success ? "Success" : "Error",
					description: payload.message,
					variant: !payload.success && "destructive",
				}))
				.then(() => setFormData(initialState))
				.then(() => setUploadErrorMsg(''));
		}
		else
			dispatch(addProduct(product))
				.then(({ payload }) => toast({
					title: payload.success ? "Success" : "Error",
					description: payload.message,
					variant: !payload.success && "destructive",
				}))
				.then(() => setFormData(initialState))
				.then(() => setUploadErrorMsg(''));
	};

	const handleImageRemove = (e) => {
		axios.delete(`/admin/products/delete-image/${formData.imageURL}`)
			.then(() => setFormData({ ...formData, imageURL: '' }))
			.catch((err) => setUploadErrorMsg(err.message));
	};

	const openAddProduct = () => {
		setOpenDialogue(true)
	}

	const handleEdit = (product) => {
		const category = product.category.map(item => ({ label: item, value: item }));
		setFormData({ ...product, category: category });
		setOpenDialogue(true);
		setEditMode(true)
	}

	const closeAddProduct = ()=> {
		setOpenDialogue(false);
		setFormData(initialFormData);
		setEditMode(false)
	}

	return (
		<section className='m-5 border-t h-full overflow-auto rounded-xl '>
			<div className='w-full mb-2 sticky top-0 flex justify-end'>
				<Button onClick={openAddProduct}>Add New Product</Button>
			</div>
			<div className='auto-fit gap-3 w-full'>
				{
					products.map((product) => (
						<ProductCard
							key={product._id}
							item={product}
							handleEdit={() => handleEdit(product)}
						/>
					))
				}
			</div>
			<Sheet
				open={openDialogue}
				onOpenChange={closeAddProduct}
			>
				<SheetContent side="right" className='overflow-auto w-96'>
					<SheetHeader>
						<div>
							<SheetTitle>
								<p>Add New Product</p>
							</SheetTitle>
							<SheetDescription>
								Upload Image
							</SheetDescription>
							<ImageUploader
								imageURL={formData.imageURL}
								uploader={handleImageUpload}
								remover={handleImageRemove}
								dropHandler={handleImageUpload}
							/>
							<form
								className='w-full flex flex-col gap-3 mt-3'
								onSubmit={handleSubmit}
							>
								<FormControls
									formControls={productsFormControls}
									formData={formData}
									setFormData={setFormData}
								/>
								<div className='mt-5 w-full flex justify-end'>
									<Button
										type="submit"
										className='px-8'
									>
										{editMode ? "Update Product" : "Add Product"}
									</Button>
								</div>
							</form>
						</div>
					</SheetHeader>
				</SheetContent>
			</Sheet>
		</section>
	)
}

export default Products