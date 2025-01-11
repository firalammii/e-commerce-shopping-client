import { FormControls, ImageUploader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { productsFormControls } from '@/config';
import useForm from '@/hooks/useForm';
import React, { useState } from 'react'

const initialState = {
	title:'',
	description:'',
	brand:'',
	category:'',
	price:'',
	amount:'',
}
const AddProducts = ({open, close}) => {
	const [formData, setFormData] = useState(initialState);
	const handleSubmit=(e)=>{
		e.preventDefault();

	}
	const handleImageUpload =(e)=>{
		console.log(e.target.files[0]);
	}
	return (
		<Sheet open={open} onOpenChange={close} >
			<SheetContent side="right">
				<SheetHeader>
					<div>
						<SheetTitle>
							<p>Add New Product</p>
						</SheetTitle>
						<SheetDescription>
							Upload Image
						</SheetDescription>
						<ImageUploader uploader={handleImageUpload}/>
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