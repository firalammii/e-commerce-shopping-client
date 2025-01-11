import { authSelector } from '@/api/slices/authSlice';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const CheckAuth = ({ children}) => {
	// const {isAuthenticated, user} = useSelector(authSelector);
	const location = useLocation();
	
	const isAuthenticated=true;
	const user= {
		role: 'admin'
	}

	if(
		!isAuthenticated && 
		!(location.pathname.includes('login') || location.pathname.includes('register'))
	) { console.log("not auth, navigates to other urls"); return <Navigate to='/auth/login' />}

	if(
		isAuthenticated && 
		(location.pathname.includes('login') || location.pathname.includes('register'))
	){
		console.log("authed, navigates to login or register");
		if (user?.role === 'admin')
			return <Navigate to='/admin/dashboard' />
		else return <Navigate to='/shop/home' />
	}
	
	if(
		isAuthenticated &&
		user?.role !== 'admin' &&
		location.pathname.includes('admin')
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