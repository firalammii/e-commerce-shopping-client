import { logoutUser } from '@/api/slices/authSlice';
import { ImageUploader } from '@/components/common';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CloudUpload } from 'lucide-react';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

const Dashboard = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	location.state = { from: '/admin/dashboard' };
	console.log("Dashboard")
	return (
		<section className='p-5'>
			<ImageUploader />
		</section>
	)
}

export default Dashboard