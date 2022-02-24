import React from 'react'
import './Login.css'

const Login=() =>{
	return(
		<form>
			<label>Nombre</label>
			<input type="text" />
			<label>Contraseña</label>
			<input type="password" />
			<input type="submit" />
		</form>
	);
}

export default Login;
