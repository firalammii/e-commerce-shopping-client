import { logoutUser } from '@/api/slices/authSlice';
import { ImageUploader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CloudUpload } from 'lucide-react';
import React from 'react'
import { useDispatch } from 'react-redux';

const Dashboard = () => {
	const dispatch = useDispatch();
	return (
		<section className='p-5'>
			<ImageUploader />
		</section>
	)
}

export default Dashboard