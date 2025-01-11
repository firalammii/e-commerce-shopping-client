import { CloudUpload } from 'lucide-react';
import React from 'react'
import { Input } from '../ui/input';

const ImageUploader = ({uploader}) => {

	return (
		<label htmlFor="imageUploader"> 
			<div className='border-dotted border-2 h-32 rounded-xl text-muted-foreground hover:text-foreground flex flex-col justify-center items-center cursor-pointer'>
				<CloudUpload size={36} />
				<span className='font-bold text-sm'>drag and drop here or click to upload</span>
				<Input type='file' onChange={uploader} id="imageUploader" className="hidden" />
			</div>
		</label>
	)
}

export default ImageUploader