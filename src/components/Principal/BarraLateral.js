import React,{useState} from 'react'
import './BarraLateral.css'

const BarraLateral = (props) =>{
	const nivel=2;
	const ejercicio=1;
	const [mostrar,setMostrar] = useState([false,false]);

	const handleClick = (clave) =>{
		let items =[...mostrar];
		items[clave]=!items[clave];
		setMostrar(items);
	};

	return(
		<div className="barra">
			<div className="nivel">
				<div className="nivel-titulo" onClick={() => handleClick(0)}>Nivel 1 1/5</div>
				{(nivel===1 || mostrar[0]) && <div>
					<div className="ejercicio">
						Ejercicio 1
					</div>
					<div className="ejercicio">
						Ejercicio 2
					</div>
					<div className="ejercicio">
						Ejercicio 3
					</div>
					<div className="ejercicio">
						Ejercicio 4
					</div>
					<div className="ejercicio">
						Ejercicio 5
					</div>
				</div>}
			</div>
			<div className="nivel">
				<div className="nivel-titulo" onClick={() => handleClick(1)}>Nivel 2 1/2</div>
				{(nivel===2 || mostrar[1]) && <div>
					<div className="ejercicio">
						Ejercicio 1
					</div>
					<div className="ejercicio">
						Ejercicio 2
					</div>
				</div>}
			</div>
		</div>
	)
}

export default BarraLateral;