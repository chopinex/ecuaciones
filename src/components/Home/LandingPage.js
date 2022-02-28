import React from 'react'
import './Home.css'
import portada from './ecuaciones.png'

const LandingPage = () =>{

	return (
		<div className="portada">
			<h1>
				Bienvenidos a ¿alfa?
			</h1>
			<img src={portada} art="portada" />
		</div>
	);
}

export default LandingPage;