import React,{useState} from 'react'
import { useSpring, animated } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import {DragDropContext} from 'react-beautiful-dnd'
import './Principal.css'
import Column from './Column'

const Principal = () =>{
    const [nivel,setNivel] =useState(1)
    const [{x,y},api] = useSpring(()=>({x:0,y:0}))

    const initialData={
        tasks: {
            'task-1' : { id: 'task-1', content: '3x'},
            'task-2' : { id: 'task-2', content: '7'},
            'task-3' : { id: 'task-3', content: '5x'},
            'task-4' : { id: 'task-4', content: '1'},
        },
        columns:{
            'column-1' : { id:'column-1', title: 'lineales', taskIds : ['task-1','task-2','task-3','task-4'],},
            'column-2' : { id:'column-2', title: 'constantes', taskIds : [],},
        },
        columnOrder : ['column-1','column-2'],
    };
    
    const bind = useDrag(({ down, offset: [ox, oy] }) => 
        api.start({ x: ox, y: oy, immediate: down })
        , {
    bounds: { left: 0, right: 520, top: 0, bottom: 120 }
    })

    const handleChange = (event) =>{
        console.log(parseInt(event.target.value))
        setNivel(parseInt(event.target.value));
    }

    const [data,setData] = useState(initialData)

    const dragStart = () =>{
        document.getElementById('contexto').style.color = 'red';
    }

    const dragUpdate = () =>{
        
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
                        <div className="lineal">4x</div>
                        <div className="igual">=</div>
                        <div className="constante">12</div>
                    </div>
                 </div>
                 <select onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                 </select>
                 <DragDropContext onDragStart={dragStart} onDragUpdate={dragUpdate} onDragEnd={dragEnd}>
                 <div id="contexto" className="lista">
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
        );    
    }
    if(nivel===2){
        return(
            <div>
                <h1>Segundo paso: transposicion</h1>
                <div className="area-ecuacion">
                    <animated.div
                    className="elemento-ecuacion"
                    {...bind()} style={{ x, y, touchAction: 'none' }}
                    >3x</animated.div>
                </div>
                <select onChange={handleChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                 </select> 
            </div>
        );}
}

export default Principal;