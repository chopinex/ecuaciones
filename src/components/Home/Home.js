import React from 'react'
import './Home.css'

const Home = () =>{


	return(
		<div className="portada">
			<h1>Hola</h1>
			<a href={"/home"}>Accede a los ejercicios</a>
			<div className="space">. </div>
		</div>
	);
}

export default Home;