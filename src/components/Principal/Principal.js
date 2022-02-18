import React,{useState,useEffect} from 'react'
import './Principal.css'
import BarraLateral from './BarraLateral'
import AreaEcuacion from './AreaEcuacion'
import flecha from './arrow.png'

const Principal = () =>{
    const [lado,setLado] = useState('column-1')
    const [paso,setPaso] = useState('reducir')
    const [etapa,setEtapa] = useState('')
    const [ecuaID,setEcuaID] = useState(1)
    const redFirst=false

    const allData = require('../../data/ecuaciones.json');
    //const initialData = allData['ejercicio-1'];

    const tipIzquierda0 = {left: "20%",top: "180px"};
    const tipIzquierda = {left: "28%",top: "250px"};
    const tipTransponer = {left: "26%",top: "280px"};
    const tipDerecha0 = {left: "64%",top: "180px"};
    const tipDerecha = {left: "58%",top: "250px"};
    const tipAbajo = {left: "30%",top: "325px"};

    const vaivenIzq0 ={position: "relative",width:"30px",height:"30px",zIndex:"-1",top:"210px",left:"24%",animation: "vaiven 1s infinite"};
    const vaivenIzq ={position: "relative",width:"30px",height:"30px",zIndex:"-1",top:"250px",left:"30%",animation: "vaiven 1s infinite"};
    const vaivenTrp ={position: "relative",width:"30px",height:"30px",zIndex:"-1",top:"280px",left:"32%",animation: "vaiven 1s infinite"};
    const vaivenDer0 ={position: "relative",width:"30px",height:"30px",zIndex:"-1",top:"210px",left:"54%",animation: "vaiven2 1s infinite"};
    const vaivenDer ={position: "relative",width:"30px",height:"30px",zIndex:"-1",top:"250px",left:"48%",animation: "vaiven2 1s infinite"};
    const vaivenAbj ={position: "relative",width:"30px",height:"30px",zIndex:"-1",top:"330px",left:"33%",animation: "vaiven 1s infinite"};

    useEffect(() => {
        var bodyRect = document.body.getBoundingClientRect(),
        elemRect = document.getElementById("ejercicio-"+ecuaID).getBoundingClientRect(),
        offset   = elemRect.top - bodyRect.top;
        console.log(elemRect.top);
        window.scrollTo(0, offset)
    }, [ecuaID])
    
    return(
        <div className="contenido">
            {lado && <div className="tip"
             style={
                {
                    'red0-column-1':tipIzquierda0,
                    'red0-column-2':tipDerecha0,
                    'transponer-column-1':tipTransponer,
                    'reducir-column-1':tipIzquierda,
                    'reducir-column-2':tipDerecha,
                    'despejar-column-3':tipAbajo,
                }[paso+'-'+lado]
             }>
                {
                    {
                        'red0-lineal' : 'REDUCIR TERMINOS LINEALES',
                        'red0-constante' : 'REDUCIR TERMINOS CONSTANTES',
                        'reducir-' : 'REDUCIR',
                        'transponer-' : 'TRANSPONER',
                        'despejar-' : 'DESPEJAR',
                    }[paso+'-'+etapa]
                }
            </div>}
            {lado && <img src={flecha}
             alt="flecha"
             style={
                {
                    'red0-column-1':vaivenIzq0,
                    'red0-column-2':vaivenDer0,
                    'transponer-column-1':vaivenTrp,
                    'reducir-column-1':vaivenIzq,
                    'reducir-column-2':vaivenDer,
                    'despejar-column-3':vaivenAbj,
                }[paso+'-'+lado]
            } />}
            <div className="areas">
            {
                Object.keys(allData).map(ecuacionId => {
                     return(
                        parseInt(allData[ecuacionId]['id'])<=ecuaID && <AreaEcuacion
                         key={ecuacionId}
                         initialData={allData[ecuacionId]}
                         redFirst={redFirst}
                         setPaso={setPaso}
                         setLado={setLado}
                         setEtapa={setEtapa}
                         numEc={ecuaID}
                         setEcuacion={setEcuaID}/>
                    );
                }
            )}
            </div>
             <BarraLateral />
        </div>
    );
}


export default Principal;