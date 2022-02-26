import React,{ useContext } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { AuthContext } from './Auth'

const PrivateRoute = () =>{
	const {user} = useContext(AuthContext);
	console.log(user);
	return(
		user ? <Outlet /> : <Navigate to={"/"} />
	);
};

export default PrivateRoute;