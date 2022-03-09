import React from 'react'
import './Home.css'
import portada from './ecuaciones.png'

const LandingPage = () =>{

	return (
		<div className="portada">
			<h1>
				Bienvenidos a ARES
			</h1>
			<img src={portada} alt="portada" />
		</div>
	);
}

export default LandingPage;