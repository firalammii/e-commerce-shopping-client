import React from 'react';
import { authSelector } from '@/api/slices/authSlice';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate, } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CheckAuth = (
	{ isAuthenticated, user, children }
) => {
// const { isAuthenticated, user } = useSelector(authSelector);
	const location = useLocation();
	// console.log(location.pathname);

	if(
		!isAuthenticated && !location.pathname.includes('/auth')) {
		console.log("not auth, navigating to other pages"); return <Navigate to='/auth/login' />;
	}

	if(
		isAuthenticated && location.pathname.includes('/auth')
	){
		console.log("authed, navigating to login or register");
		return (user?.role === 'admin') ? (<Navigate to='/admin/dashboard' />) : (<Navigate to='/shop/home' />)
	}
	
	if(
		isAuthenticated
		&& location.pathname.includes('/admin')
		&& user?.role !== 'admin'
	) return <Navigate to='/unauth-page' />

	if (
		isAuthenticated &&
		user?.role === "admin" &&
		location.pathname.includes("shop")
	) return <Navigate to="/admin/dashboard" />;

	return (
		<>
			{children}
		</>
	)
}

export default CheckAuth