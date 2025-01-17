import React from 'react'
import { CloudUpload, FileIcon, XIcon } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { prodResourceURL } from '@/api/axios';

const ImageUploader = ({ imageURL, uploadPercent, uploadError, uploader, remover, dropHandler }) => {
	return (
		<div className='border-dotted border-2 h-32 rounded-xl text-muted-foreground hover:text-foreground ' onDrop={dropHandler}>
			{
				!imageURL ?
					(
						<label htmlFor="imageUploader" className='h-full flex flex-col justify-center items-center cursor-pointer'>
							<CloudUpload size={36} />
							<span className='font-bold text-sm'> drag & drop here or click to upload
							</span>
						</label>
					)
					:
					(
						<div className='w-full h-full p-2 flex justify-between items-end'>
							<img src={prodResourceURL + imageURL} width={120} height={120} className='rounded-md w-28 h-28' />
							{/* <FileIcon /> */}
							{/* {image.filename} */}
							{/* {image.name} */}
							<Button className='text-muted-foreground hover:text-primary-foreground'>
								<label htmlFor="imageUploader">
									Change
								</label>
							</Button>
							<Button className='bg-destructive text-primary-foreground hover:text-primary-foreground' onClick={remover} >
								Remove
							</Button>
						</div>
					)
			}
				<Input type='file' onChange={uploader} id="imageUploader" className="hidden" />
			<span className={`h-1 w-full ${uploadError ? 'text-red-500' : 'text-green-500'}`}>{uploadError ? uploadError : uploadPercent}</span>
			</div>

	)
}

export default ImageUploader