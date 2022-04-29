import React from 'react'
import './Home.css'
import portada from './ecuaciones.png'
import ranaSaludo from './rana_saludo.png'

const LandingPage = () =>{

	return (
		<div className="portada">
			<h1>
				Bienvenidos a ARES
			</h1>
			{/*<img src={portada} alt="portada" />*/}
			<div style={{width: "139px",height: "124px",margin: "0 auto",backgroundImage: "url("+ranaSaludo+")",
			 animation: "saluda 1s steps(20) 2"}}
			> </div>
		</div>
	);
}

export default LandingPage;