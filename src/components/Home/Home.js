import React,{ useContext } from 'react'
import './Home.css'
import { AuthContext } from '../../Auth'

const Home = () =>{

	const {user} = useContext(AuthContext);

	return(
		<div className="portada">
			<h1>Hola {user.displayName}</h1>
			<a href={"/home"}>Accede a los ejercicios</a>
			<div className="space">. </div>
		</div>
	);
}

export default Home;