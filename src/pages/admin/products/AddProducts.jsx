import { fileUploader } from '@/api/fileUploader';
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage';

import { app } from '../../../firebase';
import { addProduct, addProductMulter } from '@/api/slices/admin/productSlice';
import { FormControls, ImageUploader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { productsFormControls } from '@/config';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useToast } from '@/hooks/use-toast';
import { axios } from '@/api/axios';

const initialState = {
	imageURL: '',
	title:'',
	description:'',
	brand:'',
	category: [],
	price:'',
	salePrice: '',
	amount:'',
}
const AddProducts = ({open, close}) => {
	const [formData, setFormData] = useState(initialState);
	const [uploadPercentage, setUploadPercentage] = useState(0);
	const [uploadErrorMsg, setUploadErrorMsg] = useState('');
	const dispatch = useDispatch();

	// 	const handleImageUpload = (e) => {
	// 		const file = e.target.files[0] || e.dataTransfer.files[0];
	// 		const storage = getStorage(app);
	// 		const fileName = new Date().getTime() + file.name;
	// 		const storageRef = ref(storage, fileName);
	// 		const uploadTask = uploadBytesResumable(storageRef, file);
	// 
	// 		uploadTask.on(
	// 			'state_changed',
	// 			(snapshot) => {
	// 				const progress =
	// 					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
	// 				setUploadPercentage(Math.round(progress));
	// 			},
	// 			(error) => {
	// 				console.log(error);
	// 				setUploadError(true);
	// 			},
	// 			() => {
	// 				getDownloadURL(uploadTask.snapshot.ref)
	// 					.then((downloadURL) => {
	// 						console.log(downloadURL);
	// 						setFormData({ ...formData, imageURL: downloadURL });
	// 					});
	// 			}
	// 		);
	// 	};

	console.log(formData)
	const handleImageUpload = (e) => {
		axios.post('/admin/products/upload-image', { imageFile: e.target.files[0] }, { headers: { "Content-Type": "multipart/form-data" } })
			.then(({ data }) => setFormData({ ...formData, imageURL: data.image.filename }))
			.catch((err) => setUploadErrorMsg(err.message));
	};

	const { toast } = useToast();
	const handleSubmit = async (e) => {
		e.preventDefault();
		const product = { ...formData };
		product.category = formData.category.map(({ value }) => value);
		dispatch(addProduct(product))
			.then(({ payload }) => toast({
				title: payload.success ? "Success" : "Error",
				description: payload.message,
				variant: payload.success ? "accent" : "destructive",
			}))
			.then(() => setFormData(initialState))
			.then(() => setUploadErrorMsg(''));
	};

	const handleImageRemove = (e) => {
		axios.delete(`/admin/products/delete-image/${formData.imageURL}`)
			.then(() => setFormData({ ...formData, imageURL: '' }))
			.catch((err) => setUploadErrorMsg(err.message));
	};

	return (
		<Sheet open={open} onOpenChange={close} >
			<SheetContent side="right" className='overflow-auto w-96'>
				<SheetHeader>
					<div>
						<SheetTitle>
							<p>Add New Product</p>
						</SheetTitle>
						<SheetDescription>
							Upload Image
						</SheetDescription>
						<ImageUploader imageURL={formData.imageURL} uploader={handleImageUpload} remover={handleImageRemove} dropHandler={handleImageUpload} />
						<form className='w-full flex flex-col gap-3 mt-3' onSubmit={handleSubmit}>
							<FormControls formControls={productsFormControls} formData={formData} setFormData={setFormData}  />
							<div className='mt-5 w-full flex justify-end'>
								<Button 
									type="submit"
									className='px-8'
								>
									Add Product
								</Button>
							</div>
						</form>
					</div>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}

export default AddProducts