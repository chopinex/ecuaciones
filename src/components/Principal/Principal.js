import React,{useState} from 'react'
import {DragDropContext} from 'react-beautiful-dnd'
import './Principal.css'
import Column from './Column'

const Principal = () =>{
    const [nivel,setNivel] = useState(1)
    const [error,setError] = useState('')
    const [lado,setLado] = useState('column-1')

    const initialData={
        tasks: {
            'task-1' : { id: 'task-1', content: '3x'},
            'task-2' : { id: 'task-2', content: '-7x'},
            'task-3' : { id: 'task-3', content: '4'},
            'task-4' : { id: 'task-4', content: '+1'},
            'igual' : {id:'igual', content: '='}
        },
        columns:{
            'column-1' : { id:'column-1', title: 'lineales', taskIds : ['task-1','task-2'],},
            'column-0' : { id:'column-0', title: 'signo', taskIds : ['igual']},
            'column-2' : { id:'column-2', title: 'constantes', taskIds : ['task-3','task-4'],},
        },
        columnOrder : ['column-1','column-0','column-2'],
    };
    

    const handleChange = (event) =>{
        console.log(parseInt(event.target.value))
        setNivel(parseInt(event.target.value));
    }

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
            setError("bien!!");
            setLado('');
        }
    }

    const dragStart = () =>{
        document.getElementById('contexto').style.color = 'green';
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
            const newTaskIds = Array.from(start.taskIds);
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

            setData(newData);
            return;
        }

        //otherwise
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index,1);
        const newStart = {
            ...start, taskIds: startTaskIds,
        }

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index,0,draggableId);
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
    }

    if(nivel===1){
        return(
            <div>
                 <h1>Primer paso: reducción</h1>
                 <div className="area-ecuacion">
                    <div className="ecuacion">
                        <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
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
                                     lado={lado}/>
                                    );
                            })
                        }
                        </div>
                        </DragDropContext>
                    </div>
                    <div className="ecuacion">
                        {<input type="text" className="reducido" disabled={lado!=='column-1'?true:false} onKeyPress={e => e.key === 'Enter' && calcularL(e.target.value)}/>}
                        <div className="reducido" style={{color: 'blue',}}>=</div>
                        {<input type="text"
                         className="reducido" disabled={lado!=='column-2'?true:false} onKeyPress={e => e.key === 'Enter' && calcularC(e.target.value)}/>}
                    </div>
                    <div>{error}</div>
                 </div>
                 <select onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                 </select>
            </div>
        );    
    }
    if(nivel===2){
        return(
            <div>
                <h1>Segundo paso: transposicion</h1>
                <div className="area-ecuacion">
                    <DragDropContext onDragStart={dragStart} onDragEnd={dragEnd}>
                        <div className="lista">
                        {
                            data.columnOrder.map(columnId => {
                                const column = data.columns[columnId];
                                const tasks =column.taskIds.map(taskId => data.tasks[taskId])

                                return (
                                    <Column key={column.id} column={column} tasks={tasks} />
                                    );
                            })
                        }
                    </div>
                    </DragDropContext>
                </div>
                <select onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                 </select> 
            </div>
        );}
}

export default Principal;