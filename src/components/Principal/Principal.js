import React,{ useState,useEffect,useContext } from 'react'
import { getFirestore,doc,setDoc,collection,getDocs } from 'firebase/firestore'
import './Principal.css'
import BarraLateral from './BarraLateral'
import AreaEcuacion from './AreaEcuacion'
import { AuthContext } from '../../Auth'
import flecha from './arrow.png'
import aresApuntar from './ares_apuntar.png'

var soluciones = [];
var inicio=false;

const Principal = () =>{
    const [lado,setLado] = useState('column-1')
    const [paso,setPaso] = useState('reducir')
    const [etapa,setEtapa] = useState('')
    const [nivID,setNivID] = useState(1)
    const [ecuaID,setEcuaID] = useState(1)
    const [oldEcuaID,setOldEcuaID] = useState(0)
    const [solved,setSolved] = useState([])
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

    /*const vaivenIzq0 ={margin: "0",position: "relative",width:"30px",height:"30px",top:"210px",
                        zIndex:"-1",left:"6vw",animation: "vaiven 1s infinite"};
    const vaivenIzq ={margin: "0",position: "relative",width:"30px",height:"30px",
                      top:(32+70*(ecuaID-1)).toString()+"vh",zIndex:"-1",left:"6vw",animation: "vaiven 1s infinite"};
    const vaivenTrp ={margin: "0",position: "relative",width:"30px",height:"30px",top:"280px",
                      zIndex:"-1",left:"32%",animation: "vaiven 1s infinite"};
    const vaivenDer0 ={margin: "0",position: "relative",width:"30px",height:"30px",top:"210px",
                      zIndex:"-1",left:"54%",animation: "vaiven2 1s infinite"};
    const vaivenDer ={margin: "0",position: "relative",width:"30px",height:"30px",
                      top:(30+70*(ecuaID-1)).toString()+"vh",zIndex:"-1",left:"50vw",animation: "vaiven2 1s infinite"};
    const vaivenAbj ={margin: "0",position: "relative",width:"30px",height:"30px",top:"330px",
                      zIndex:"-1",left:"33%",animation: "vaiven 1s infinite"};*/

    const animIzq ={position: "absolute",width: "138px",height: "249px",top:(40+70*(ecuaID-1)).toString()+"vh",zIndex:"-1",
                    backgroundImage: "url("+aresApuntar+")",left:"25vw",animation: "anim 2s steps(30) 2"};
    const animDer ={position: "absolute",width: "138px",height: "249px",top:(40+70*(ecuaID-1)).toString()+"vh",
                    zIndex:"-1",backgroundImage: "url("+aresApuntar+")",left:"58vw",animation: "anim2 2s steps(30) 2",
                    transform: "scaleX(-1)"};

    useEffect( () => {
        if(user.email){
            async function fecthData(){
                const snapshot = await getDocs(collection(firestore,user.email));
                snapshot.forEach((doc) => {
                    soluciones.push(doc.data());
                });
                let sols=[]
                for(let i=0;i<soluciones.length;i++){
                    if(soluciones[i].reducir[0]===""){
                        sols.push(parseInt(soluciones[i].ecuacion));
                    }
                }
                if(sols.length>0)
                    inicio=true;
                setSolved([...solved,...sols]);
                setEcuaID(soluciones.length+1);
            }
            fecthData();
        }
    },[user.email])

    useEffect(() => {
        //console.log(solved,",",inicio,",",oldEcuaID);
        let ecs="";
        if(solved.includes(oldEcuaID)){
            ecs=(oldEcuaID).toString();    
            setSolved(solved.filter(item => item !== oldEcuaID));
            inicio=true;
        }
        else
            ecs=(ecuaID-1).toString();
        let elemL=document.getElementById("reducirLineal-"+nivID+"-"+ecs);
        let elemC=document.getElementById("reducirConstante-"+nivID+"-"+ecs);
        let elemR=document.getElementById("despejar-"+nivID+"-"+ecs);
        if(user.email&&elemL&&elemC){
            let elemLV=elemL.value;
            let elemCV=elemC.value;
            let elemRV=elemR?elemR.value:null;
            if(ecs.length===1)
                ecs='0'+ecs;
            const alumnoData = doc(firestore,user.email+'/ecuacion'+nivID+'-'+ecs);
            const av={
                nivel:nivID,
                ecuacion: ecs,
                red0: null,
                transponer: null,
                reducir: [elemLV,elemCV],
                despejar: elemRV
            };
            setDoc(alumnoData,av,{merge: true});
        }

        if(solved.length>0&&inicio){
            let prim=0;
            if(solved[0]===oldEcuaID)
                prim=solved[1];
            else{
                if(solved.indexOf(oldEcuaID)<solved.length-1)
                    prim=solved[solved.indexOf(oldEcuaID)+1];
                else
                    prim=ecuaID;
            }
            let offset = document.getElementById("ejercicio-"+prim).offsetTop;
            window.scrollTo({left : 0, top: offset-100, behavior: 'smooth'});
            inicio=false;
        }
        else{
            if(ecuaID<=Object.keys(allData).length && document.getElementById("ejercicio-"+ecuaID)){
                let offset = document.getElementById("ejercicio-"+ecuaID).offsetTop;
                window.scrollTo({left : 0, top: offset-100, behavior: 'smooth'});
            }
        }
    }, [oldEcuaID,ecuaID])

    if(!user.email)
        return("homa");
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
            {/*{lado && <img src={flecha}
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
            } />}*/}
            {lado && <div className="animar"
             style={
                {
                    'reducir-column-1':animIzq,
                    'reducir-column-2':animDer,   
                }[paso+'-'+lado]
             }>
            </div>}
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
                         setNivel={setNivID}
                         numEc={ecuaID}
                         setEcuacion={setEcuaID}
                         setOldEcuacion={setOldEcuaID}
                         defecto={soluciones?soluciones[theID-1]:null}/>
                    );
                }
            )}
            </div>
             <BarraLateral initialData={allData} numNiv={nivID} numEc={ecuaID} oldEc={solved.length?solved[0]:0}/>
        </div>
    );
    }
}


export default Principal;