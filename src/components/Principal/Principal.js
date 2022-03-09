import React,{ useState,useEffect,useContext } from 'react'
import { getFirestore,doc,setDoc,collection,getDocs } from 'firebase/firestore'
import './Principal.css'
import BarraLateral from './BarraLateral'
import AreaEcuacion from './AreaEcuacion'
import { AuthContext } from '../../Auth'
import flecha from './arrow.png'

var soluciones = [];

const Principal = () =>{
    const [lado,setLado] = useState('column-1')
    const [paso,setPaso] = useState('reducir')
    const [etapa,setEtapa] = useState('')
    const [nivID,setNivID] = useState(1)
    const [ecuaID,setEcuaID] = useState(1)
    const [oldEcuaID,setOldEcuaID] = useState(0)
    const redFirst=false

    const {user} = useContext(AuthContext);
    const firestore = getFirestore();
    const allData = require('../../data/ecuaciones.json');

    const tipIzquierda0 = {left: "20%",top: "180px"};
    const tipIzquierda = {left: "22vw",top: (32+70*(ecuaID-1)).toString()+"vh"};
    const tipTransponer = {left: "26%",top: "280px"};
    const tipDerecha0 = {left: "64%",top: "180px"};
    const tipDerecha = {left: "55vw",top: (30+70*(ecuaID-1)).toString()+"vh"};
    const tipAbajo = {left: "30%",top: "325px"};

    const vaivenIzq0 ={position: "relative",width:"30px",height:"30px",top:"210px",zIndex:"-1",left:"24%",animation: "vaiven 1s infinite"};
    const vaivenIzq ={position: "relative",width:"30px",height:"30px",
                      top:(32+70*(ecuaID-1)).toString()+"vh",zIndex:"-1",left:"32vw",animation: "vaiven 1s infinite"};
    const vaivenTrp ={position: "relative",width:"30px",height:"30px",top:"280px",zIndex:"-1",left:"32%",animation: "vaiven 1s infinite"};
    const vaivenDer0 ={position: "relative",width:"30px",height:"30px",top:"210px",zIndex:"-1",left:"54%",animation: "vaiven2 1s infinite"};
    const vaivenDer ={position: "relative",width:"30px",height:"30px",
                      top:(30+70*(ecuaID-1)).toString()+"vh",zIndex:"-1",left:"50vw",animation: "vaiven2 1s infinite"};
    const vaivenAbj ={position: "relative",width:"30px",height:"30px",top:"330px",zIndex:"-1",left:"33%",animation: "vaiven 1s infinite"};

    useEffect( () => {
        if(user.email){
            async function fecthData(){
                const snapshot = await getDocs(collection(firestore,user.email));
                snapshot.forEach((doc) => {
                    soluciones.push(doc.data());
                });
                setEcuaID(soluciones.length+1);
            }
            /*for(let x=0;x<soluciones.length;x++){
                console.log(soluciones[x]['reducir']);
            }*/
            fecthData();
        }
    },[user.email])

    useEffect(() => {
        let ecs="";
        if(oldEcuaID!==0)
            ecs=(oldEcuaID-1).toString();    
        else
            ecs=(ecuaID-1).toString();
        let elemL=document.getElementById("reducirLineal-"+nivID+"-"+ecs);
        let elemC=document.getElementById("reducirConstante-"+nivID+"-"+ecs);
        if(user.email&&elemL&&elemC){
            let elemLV=elemL.value;
            let elemCV=elemC.value;
            if(ecs.length===1)
                ecs='0'+ecs;
            const alumnoData = doc(firestore,user.email+'/ecuacion'+nivID+'-'+ecs);
            const av={
                nivel:nivID,
                ecuacion: ecs,
                red0: null,
                transponer: null,
                reducir: [elemLV,elemCV],
                despejar: null
            };
            setDoc(alumnoData,av,{merge: true});
        }
        if(ecuaID<=Object.keys(allData).length && document.getElementById("ejercicio-"+ecuaID)){
            let offset   = document.getElementById("ejercicio-"+ecuaID).offsetTop;
            //var alto   = document.getElementById("ejercicio-"+ecuaID).offsetHeight;
            window.scrollTo({left : 0, top: offset-100, behavior: 'smooth'});
        if(oldEcuaID!==0)
            setOldEcuaID(0);
        }
    }, [ecuaID,oldEcuaID])

    if(!user.email){
        return(<div className="contenido"><h1>Cargando...</h1></div>);
    }
    else{
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
                    let theID= parseInt(allData[ecuacionId]['id']);
                     return(
                        theID<=ecuaID && <AreaEcuacion
                         key={ecuacionId}
                         initialData={allData[ecuacionId]}
                         redFirst={redFirst}
                         setPaso={setPaso}
                         setLado={setLado}
                         setEtapa={setEtapa}
                         ejercicioID={ecuacionId}
                         nivel={nivID}
                         numEc={ecuaID}
                         setEcuacion={setEcuaID}
                         setOldEcuacion={setOldEcuaID}
                         defecto={soluciones?soluciones[theID-1]:null}/>
                    );
                }
            )}
            </div>
             <BarraLateral initialData={allData} numNiv={nivID} numEc={ecuaID}/>
        </div>

    );
    }
}


export default Principal;