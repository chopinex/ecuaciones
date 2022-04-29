import React,{ useContext } from 'react'
import './Home.css'
import { AuthContext } from '../../Auth'

const Home = () =>{

	const {user} = useContext(AuthContext);

	return(
		<div className="portada">
			<h1>¡Hola, {user.displayName}!</h1>
			<a href={"/teoria"}>Ir a teoría</a>
			<a href={"/home"}>Ir a ejercicios</a>
			<div className="space">. </div>
		</div>
	);
}

export default Home;