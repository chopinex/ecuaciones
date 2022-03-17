import React,{useState,useEffect} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import './AreaEcuacion.css'
import Column from './Column'


const AreaEcuacion = (props) =>{
    const [error,setError] = useState('')
    const [lado,setLado] = useState('column-1')
    const [paso,setPaso] = useState('reducir')
    const [origen,setOrigen] = useState('')
    const [etapa,setEtapa] = useState('')
    const [inputValue,setInputValue] = useState('')
    const [input2Value,setInput2Value] = useState('')
    const [jump,setJump] = useState(true);

    const [data,setData] = useState(props.initialData)
    const numerito=props.ejercicioID.match(/[0-9]+/)[0];
    
    const actualizacion = () =>{
        const entradas = document.getElementById('red0Results').getElementsByTagName('input');
        const newTasks = {
            'task-1' : { id: 'task-1', content: entradas[0].value, tipo:'lineal' },
            'task-2' : { id: 'task-2', content: entradas[1].value, tipo:'constante' },
            'task-3' : { id: 'task-3', content: entradas[2].value, tipo:'lineal' },
            'task-4' : { id: 'task-4', content: entradas[3].value, tipo:'constante' },
            'igual': {id:'igual', content: '='}
        };
        const newLineal = {
            ...data.columns['column-1'],taskIds: ['task-1','task-2'],
        }
        const newConstante = {
            ...data.columns['column-2'],taskIds: ['task-3','task-4'],
        }
        const newColumns = {
            ...data.columns,
            'column-1' : newLineal,
            'column-2' : newConstante,

        }
        const newData = {
            ...data,
            tasks:newTasks,
            columns:newColumns,
        }
        setData(newData);
    }

    const calcularL = (value,col) =>{
        if (['1x','+1x','+x'].includes(value))
            setInputValue('x');
        var suma=0;
        var val = parseInt(value);
        if(isNaN(val)){
            if(value[0]==='-')
                val=-1;
            if(['+','x','y','z'].includes(value[0]))
                val=1;
        }
        var variable=value.match(/[A-Za-z]+/);
        if(!variable){
            setError("no hay variable!");
            return;
        }
        else{
            if(variable[0]!=='x'&& variable[0]!=='X'){
                setError("no es la variable correcta");
                return;
            }
            else
                setError("");
        }    

        data.columns[col].taskIds.map( tid =>{
            var num = parseInt(data.tasks[tid].content);
            //cuando es +x o -x
            if(isNaN(num)){
                if(data.tasks[tid].content[0]==="+")
                    num=1;
                if(data.tasks[tid].content[0]==="-")
                    num=-1;
            }
            if(data.tasks[tid].tipo==='lineal')
                suma+=num;
        })
        if(suma!==val)
            setError("no es el valor correcto");
        else{
            setError("bien!!");
            if(paso==='red0'){
                setEtapa('constante');
                props.setEtapa('constante');
            }
            else{
                setLado('column-2');
                props.setLado('column-2');
            }
        }
    }

    const calcularC = (value,col) =>{
        var suma=0;
        var val = parseInt(value);
        
        data.columns[col].taskIds.map( tid =>{
            if(data.tasks[tid].tipo==='constante')
                suma+=parseInt(data.tasks[tid].content);
        })
        if(suma!==val)
            setError("no es el valor correcto");
        else{
            setError("");
            if(paso==='red0'){
                if(lado==='column-1'){
                    setLado('column-2');
                    props.setLado('column-2');
                    setEtapa('lineal');
                    props.setEtapa('lineal');
                }
                else{
                    actualizacion();
                    setPaso('transponer');
                    props.setPaso('transponer');
                    setLado('column-1');
                    props.setLado('column-1');
                    setEtapa('');
                    props.setEtapa('');
                }
            }
            else{
                if (document.getElementById("reducirLineal-"+props.nivel+"-"+numerito).value!=='x'){
                    setPaso('despejar');
                    props.setPaso('despejar');
                    setLado('column-3');
                    props.setLado('column-3');
                }
                //acabamos!!
                else{
                    setLado('');
                    props.setLado('column-1');   
                    setError("bien!");
                    setJump(false);
                    if(parseInt(numerito)!==props.numEc)
                        props.setOldEcuacion(parseInt(numerito));
                    else
                        props.setEcuacion(props.numEc+1);
                }
            }
        }
    }

    const calcularR = (value) =>{
        if(value===data.answer){
            setError("bien!");
            setLado('');
            props.setLado('column-1');
            setJump(false);
            if(parseInt(numerito)!==props.numEc)
                props.setOldEcuacion(parseInt(numerito));
            else
                props.setEcuacion(props.numEc+1);
        }
        else{
            setError("no es correcto");
        }
    }

    const handleChange = (e) =>{
        setInputValue(e.target.value);
    }

    const handleChange2 = (e) =>{
        setInput2Value(e.target.value);
    }

    const handleJump = () =>{
        setJump(false);
        props.setEcuacion(props.numEc+1);
    }

    const updateX = (value) =>{
        if (['1x','+1x','+x'].includes(value))
            setInputValue('x');
    }

    const dragStart = start =>{
        document.getElementById('contexto').style.color = 'green';
        const {draggableId} = start;
        setOrigen(data.tasks[draggableId].content);
    }

    const dragUpdate = update =>{
        const {destination,source,draggableId} = update;

        const start = data.columns[source.droppableId].id;
        const finish = destination?data.columns[destination.droppableId].id:null;

        const arrastradoX=document.getElementById(draggableId).getBoundingClientRect().x;
        const igualX=document.getElementById("column-0").getBoundingClientRect().x;
        const orig=data.tasks[draggableId].content;

        if(finish && start!==finish && orig === origen){        
            if((finish==='column-2' && arrastradoX>igualX) || (finish==='column-1' && arrastradoX<igualX)){
                var cambio=parseInt(orig);
                var x="";
                if (orig.match(/[A-Za-z]+/))
                    x=orig.match(/[A-Za-z]+/)[0];
                //si es +x o -x
                if(isNaN(cambio)){
                    if(orig[0]==='+')
                        cambio=1;
                    if(orig[0]==='-')
                        cambio=-1;
                }
                cambio=cambio*(-1);
                
                const newTask = {
                    ...data.tasks[draggableId],
                    content: cambio>0?"+"+((cambio===1 && x.length>0)?"":cambio.toString())+x:((cambio===-1 && x.length>0)?"-":cambio.toString())+x,
                };

                const newData = {
                    ...data,
                    tasks: {
                        ...data.tasks,
                        [draggableId]: newTask,
                    },
                };
                setData(newData);
            }
        }
        //si se arrepiente luego de pasar al otro lado sin soltar
        if(finish && start===finish){
            if((finish==='column-1' && arrastradoX<igualX) || (finish==='column-2' && arrastradoX>igualX)){
                //console.log(orig," : ",origen); 
                const newTask = {
                    ...data.tasks[draggableId],
                    content: origen,
                };

                const newData = {
                    ...data,
                    tasks: {
                        ...data.tasks,
                        [draggableId]: newTask,
                    },
                };
                setData(newData);
            }
        }
        
    } 

    const dragEnd = result =>{
        document.getElementById('contexto').style.color = 'inherit';
        const {destination,source,draggableId} = result;
        if(!destination){
            //por si cambia de signo luego de moverse sin soltar en la lista
            data.tasks[draggableId].content=origen;
            return ;
        }
        if(destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];
        if (start===finish){
            console.log(finish);
            return;
        }

        //otherwise
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start, taskIds: startTaskIds,
        }
        const finishTaskIds = Array.from(finish.taskIds);
        //finishTaskIds.splice(destination.index,0,draggableId);
        const le=finish.taskIds.length
        finishTaskIds.splice(le,0,draggableId);
        
        const newFinish = {
            ...finish, taskIds: finishTaskIds,
        }

        const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish,
                },
            };       

        setData(newData);
        setOrigen('');
    }

    useEffect(() =>{
        //cambio de signo
        const start = data.columns['column-1'];
        const finish = data.columns['column-2'];
        var newTask1=data.tasks[finish.taskIds[0]]
        var newTask2=data.tasks[start.taskIds[0]]
        var change=false;
        if(finish.taskIds.length>0 && data.tasks[finish.taskIds[0]].content[0]==='+'){
            newTask1.content=newTask1.content.substring(1);
            change=true;
        }
        if(start.taskIds.length>0 && data.tasks[start.taskIds[0]].content[0]==='+'){
            newTask2.content=newTask2.content.substring(1);
            change=true;
        }
        if(change){
            const newData = {
                ...data,
                tasks: {
                    ...data.tasks,
                    [start.taskIds[0]]: newTask2,
                    [finish.taskIds[0]]: newTask1,
                },
            };       
            setData(newData);
        }

        //comprobación de fin
        var ok=true;
        for(var i=0;i<data.columns['column-1'].taskIds.length;i++){
            if(data.tasks[data.columns['column-1'].taskIds[i]].content.substr(-1)!=='x')
                ok=false;
        }
        for(i=0;i<data.columns['column-2'].taskIds.length;i++){
            if(!parseInt(data.tasks[data.columns['column-2'].taskIds[i]].content.substr(-1)))
                ok=false;
        }
        if(ok && paso==='transponer'){
            setError("Listo!");
            setPaso('reducir');
        }
    },[data,paso]);

    useEffect(() => {
        //console.log(document.activeElement.id);
        if(error===''&&inputValue!==''&&document.activeElement.id==="reducirLineal-"+props.nivel+"-"+numerito)
            setTimeout(() => setError('Presiona Enter para confirmar tu respuesta'),4000);
        if(error===''&&input2Value!==''&&document.activeElement.id==="reducirConstante-"+props.nivel+"-"+numerito)
            setTimeout(() => setError('Presiona Enter para confirmar tu respuesta'),4000);
        if(error!=='')
            setTimeout(() => setError(''),5000);
    },[inputValue,input2Value,error]);

    useEffect(()=>{
        props.setNivel(data.nivel);
        if(props.defecto&&props.defecto.despejar){
            if(props.defecto.despejar!=="")
                setPaso('despejar');
        }
    },[data]);

    const tempArray = props.initialData;

    const normalNumber = {color: "darkgreen",fontSize:"20pt",width:"25px"};
    const animatedNumber = {animation: "animatedNumber2 1s infinite"};

    const normalRedux = {color: "crimson",fontSize:"20pt",width:"25px"};
    const animatedRedux = {animation: "animatedNumber3 1s infinite"};
    console.log(paso);
    return(
        <div className="area-ecuacion" id={props.ejercicioID}>
                {props.redFirst && <div className="ecuacion">
                    {
                        data.columnOrder.map(columnId =>{
                            const column = tempArray.columns[columnId];
                            const tasks =column.taskIds.map(taskId => tempArray.tasks[taskId]);
                            return(
                                <div key={columnId} style={{display:"flex"}}>                           
                                    {tasks.map(({id,content,tipo}) => 
                                        <div key={id}
                                         className="redo"
                                         style={(columnId===lado && tipo===etapa)?animatedRedux:normalRedux}
                                         >
                                        {content}
                                        </div>)}
                                </div>
                            );
                        })
                    }
                </div>}
                {props.redFirst && <div className="ecuacion" id="red0Results">
                    <input type="text" 
                     className="reducido" disabled={(lado!=='column-1' || etapa!=='lineal')?true:false} 
                     onKeyPress={e => e.key === 'Enter' && calcularL(e.target.value,'column-1')}/>
                    <input type="text" 
                     className="reducido" disabled={(lado!=='column-1' || etapa!=='constante')?true:false} 
                     onKeyPress={e => e.key === 'Enter' && calcularC(e.target.value,'column-1')}/>
                    <div className="reducido" style={{color: 'blue',width:'20px',}}>=</div>
                    <input type="text"
                     className="reducido" disabled={(lado!=='column-2' || etapa!=='lineal')?true:false} 
                     onKeyPress={e => e.key === 'Enter' && calcularL(e.target.value,'column-2')}/>
                    <input type="text"
                     className="reducido" disabled={(lado!=='column-2' || etapa!=='constante')?true:false} 
                     onKeyPress={e => e.key === 'Enter' && calcularC(e.target.value,'column-2')}/> 
                </div>}
                {paso!=='red0' && <div className="ecuacion">
                    <DragDropContext onDragStart={dragStart} onDragUpdate={dragUpdate} onDragEnd={dragEnd}>
                    <div id="contexto" className="lista">
                    {
                        data.columnOrder.map(columnId => {
                            const column = data.columns[columnId];
                            const tasks =column.taskIds.map(taskId => data.tasks[taskId])
                                return (
                                <Column
                                 key={column.id}
                                 column={column}
                                 tasks={tasks}
                                 lado={lado}
                                 paso={paso}
                                 animar={parseInt(numerito)===props.numEc}
                                 />
                                );
                        })
                    }
                    </div>
                    </DragDropContext>
                </div>}
                {(paso==='reducir' || paso==='despejar') &&  <div className="ecuacion">
                    {(!props.defecto||props.defecto.reducir[0]==="")?<input type="text" 
                     className="reducido"
                     disabled={lado!=='column-1'?true:false}
                     id={"reducirLineal-"+props.nivel+"-"+numerito}
                     value={inputValue}
                     onChange={handleChange}
                     onBlur={e => updateX(e.target.value)}
                     onKeyPress={e => e.key === 'Enter' && calcularL(e.target.value,'column-1')}/>:
                     <label className="reducido">{props.defecto['reducir'][0]}</label>}

                    <div className="reducido" style={{color: 'blue',width:'20px',}}>=</div>

                    {(!props.defecto||props.defecto.reducir[0]==="")?<input type="text"
                     className="reducido"
                     disabled={lado!=='column-2'?true:false}
                     id={"reducirConstante-"+props.nivel+"-"+numerito}
                     onChange={handleChange2}
                     onKeyPress={e => e.key === 'Enter' && calcularC(e.target.value,'column-2')}/>:
                     <label className="reducido">{props.defecto['reducir'][1]}</label>}
                </div>}
                {paso=== 'despejar' && <div className="ecuacion">
                    <label className="despejado" style={lado==='column-3'?animatedNumber:normalNumber}>x</label>
                    <div className="despejado" style={{width:'20px',}}>=</div>
                    {(!props.defecto||props.defecto.despejar==="")?
                    <input type="text" id={"despejar-"+props.nivel+"-"+numerito}
                     className="despejado" disabled={lado===''?true:false} 
                     onKeyPress={e => e.key === 'Enter' && calcularR(e.target.value)}/>:
                    <label className="despejado">{props.defecto['despejar']}</label>}
                </div>}
                <div>{error}</div>
                <div className="seudoEnlace" onClick={() => handleJump()}>
                    {(jump&&!props.defecto)?"Saltar ejercicio":""}
                </div>
             </div>

    );

}

export default AreaEcuacion;