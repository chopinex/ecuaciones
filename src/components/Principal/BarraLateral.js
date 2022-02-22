import React,{useState} from 'react'
import './BarraLateral.css'

const BarraLateral = (props) =>{

	var cntNivel=[];
	let nvl = "1";
	let cnt = 0;
	var nvls = 1;
	Object.keys(props.initialData).map(ecuacionId => {
		if(props.initialData[ecuacionId]['nivel']===nvl)
			cnt++;
		else{
			cntNivel.push(cnt);
			cnt=0;
			nvl=props.initialData[ecuacionId]['nivel'];
			nvls++;
		}
	});
	cntNivel.push(cnt);

	const [mostrar,setMostrar] = useState([true,false,false,false,false]);

	const handleClick = (clave) =>{
		let items =[...mostrar];
		items[clave]=!items[clave];
		setMostrar(items);
	};

	const activo= {backgroundColor:"lightBlue",color:"navy",border:"navy 1px solid"};

	const ejercicios=[];
	const niveles=[];
	for (let i = 0; i < nvls; i++) {
		let ej=[];
		for( let j = 0; j < cntNivel[i]; j++)
			ej.push(<div key={j} className="ejercicio" style={(props.numEc===j+1)?activo:null}>Ejercicio {j+1}</div>);
		ejercicios.push(ej);
 	}
 	for (let i = 0; i < nvls; i++) {
 		niveles.push(<div className="nivel">
 			<div className="nivel-titulo" onClick={() => handleClick(0)}>Nivel {i+1}-{ejercicios[i].length}</div>
 			{(props.numNiv ===i+1 || mostrar[i]) && <div>
 				{ejercicios[i]}
 			 </div>
 			}
 			</div>
 		);
	}

	return(
		<div className="barra">
			{niveles}
		</div>
	)
}

export default BarraLateral;