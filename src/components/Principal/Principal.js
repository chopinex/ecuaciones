import React,{useState,useEffect} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import './Principal.css'
import Column from './Column'
import flecha from './arrow.png'

const Principal = () =>{
    const [error,setError] = useState('')
    const [lado,setLado] = useState('column-1')
    const [paso,setPaso] = useState('transponer')
    const [origen,setOrigen] = useState('')

    const initialData={
        tasks: {
            'task-1' : { id: 'task-1', content: '3x'},
            'task-2' : { id: 'task-2', content: '-4'},
            'task-3' : { id: 'task-3', content: '7x'},
            'task-4' : { id: 'task-4', content: '+1'},
            'igual' : {id:'igual', content: '='}
        },
        columns:{
            'column-1' : { id:'column-1', title: 'lineales', taskIds : ['task-1','task-2'],},
            'column-0' : { id:'column-0', title: 'signo', taskIds : ['igual']},
            'column-2' : { id:'column-2', title: 'constantes', taskIds : ['task-3','task-4'],},
        },
        columnOrder : ['column-1','column-0','column-2'],
        answer : '-5/4',
    };
    
    const [data,setData] = useState(initialData)

    const calcularL = (value) =>{
        var suma=0;
        var val = parseInt(value);
        var variable=value.match(/[A-Za-z]+/);
        if(!variable){
            setError("no hay variable!");
            return;
        }
        else{
            if(variable[0]!=='x'){
                setError("no es la variable correcta");
                return;
            }
            else
                setError("");
        }    

        data.columns['column-1'].taskIds.map( tid =>{
            suma+=parseInt(data.tasks[tid].content.match(/[+,-]*\d+/g));
        })
        if(suma!==val)
            setError("no es el valor correcto");
        else{
            setError("bien!!");
            setLado('column-2');
        }
    }

    const calcularC = (value) =>{
        var suma=0;
        var val = parseInt(value);
        
        data.columns['column-2'].taskIds.map( tid =>{
            suma+=parseInt(data.tasks[tid].content.match(/[+,-]*\d+/g));
        })
        if(suma!==val)
            setError("no es el valor correcto");
        else{
            setError("");
            setLado('column-3');
            setPaso('despejar')
        }
    }

    const calcularR = (value) =>{
        if(value===data.answer){
            setError("bien!");
            setLado('');
        }
        else{
            setError("no es correcto");
        }
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
                var cambio=parseInt(orig)*(-1);
                var x="";
                if (orig.match(/[A-Za-z]+/))
                    x=orig.match(/[A-Za-z]+/)[0];
                
                const newTask = {
                    ...data.tasks[draggableId],
                    content: cambio>0?"+"+cambio.toString()+x:cambio.toString()+x,
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
        if(!destination)
            return ;
        if(destination.droppableId === source.droppableId && destination.index === source.index)
            return;

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start===finish){
            /*const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index,1);
            newTaskIds.splice(destination.index,0,draggableId);

            const newColumn ={
                ...start, taskIds: newTaskIds,
            };


            const newData = {
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            };

            setData(newData);*/
            return;
        }

        //otherwise
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start, taskIds: startTaskIds,
        }
        //console.log(finish.taskIds.length);
        const finishTaskIds = Array.from(finish.taskIds);
        //finishTaskIds.splice(destination.index,0,draggableId);
        const le=finish.taskIds.length
        finishTaskIds.splice(le,0,draggableId);
        var newTask1=data.tasks[finish.taskIds[0]]
        var newTask2=data.tasks[start.taskIds[0]]
        if(le>0 && data.tasks[finish.taskIds[0]].content[0]==='+')
            newTask1.content=newTask1.content.substring(1);
        if(le>0 && data.tasks[start.taskIds[0]].content[0]==='+')
            newTask2.content=newTask2.content.substring(1);
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
    });


    const normalNumber = {color: "darkgreen",fontSize:"20pt"};
    const animatedNumber = {animation: "animatedNumber2 1s infinite"};

    const tipIzquierda = {left: "30%",top: paso==='reducir'?"160px":"195px"};
    const tipDerecha = {left: "62%",top: "160px"};
    const tipAbajo = {left: "33%",top: "280px"};

    const vaivenIzq ={position: "relative",width:"30px",zIndex:"1",top:paso==='reducir'?"140px":"170px",left:paso==='reducir'?"40%":"42%",animation: "vaiven 1s infinite"};
    const vaivenDer ={position: "relative",width:"30px",zIndex:"1",top:"130px",left:"58%",animation: "vaiven2 1s infinite"};
    const vaivenAbj ={position: "relative",width:"30px",zIndex:"1",top:"250px",left:"42%",animation: "vaiven 1s infinite"};
    
    return(
        <div>
            {lado && <div className="tip" style={(paso==='reducir' || paso==='transponer')?(lado==='column-1'?tipIzquierda:tipDerecha):tipAbajo}>
                {
                    {
                        'reducir' : 'REDUCIR',
                        'transponer' : 'TRANSPONER',
                        'despejar' : 'DESPEJAR',
                    }[paso]
                }
            </div>}
            {lado && <img src={flecha}
             alt="flecha"
             style={(paso==='reducir'||paso==='transponer')?(lado==='column-1'?vaivenIzq:vaivenDer):vaivenAbj} />}
             <div className="area-ecuacion">
                <div className="ecuacion">
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
                                 paso={paso}/>
                                );
                        })
                    }
                    </div>
                    </DragDropContext>
                </div>
                <div className="ecuacion">
                    {paso!=='transponer' && <input type="text" 
                     className="reducido" disabled={lado!=='column-1'?true:false} onKeyPress={e => e.key === 'Enter' && calcularL(e.target.value)}/>}
                    {paso!=='transponer' && <div className="reducido" style={{color: 'blue',}}>=</div>}
                    {paso!=='transponer' && <input type="text"
                     className="reducido" disabled={lado!=='column-2'?true:false} onKeyPress={e => e.key === 'Enter' && calcularC(e.target.value)}/>}
                </div>
                <div className="ecuacion">
                    {paso=== 'despejar' && <label className="despejado" style={lado==='column-3'?animatedNumber:normalNumber}>x</label>}
                    {paso==='despejar' && <div className="despejado">=</div>}
                    {paso==='despejar' && <input type="text"
                     className="despejado" disabled={lado===''?true:false} onKeyPress={e => e.key === 'Enter' && calcularR(e.target.value)}/>}

                </div>
                <div>{error}</div>
             </div>
        </div>
    );
}


export default Principal;