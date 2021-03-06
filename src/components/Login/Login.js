import React, { useCallback,useContext } from 'react'
import { signInWithEmailAndPassword, setPersistence, browserSessionPersistence } from "firebase/auth"
import { useNavigate,Navigate } from 'react-router-dom'
import app from '../../config'
import { AuthContext } from '../../Auth'
import './Login.css'

const Login=() =>{
	const navigate =useNavigate();

	const handleLogin = useCallback(
		async event =>{
			event.preventDefault();
			const {email,password} = event.target.elements;
			try{
				await setPersistence(app, browserSessionPersistence);
				await signInWithEmailAndPassword(app,email.value,password.value);
				navigate("/inicio");
			} catch(error){
				console.log(error);
			}
		},[navigate]
	);

	const {user} = useContext(AuthContext);

	if (user){
		return <Navigate to="/inicio" />;
	}

	return(
		<form onSubmit={handleLogin}>
			<h1>Login</h1>
			<label>Email</label>
			<input name="email" type="email" />
			<label>Contraseña</label>
			<input name="password" type="password" />
			<input type="submit" value="Accede" />
		</form>
	);
}

export default Login;
