import React from 'react'
import {Droppable} from 'react-beautiful-dnd'
import './Column.css'
import Task from './Task'

const Column = (props) =>{
    const normalNumber = {color: "red",fontSize:"20pt"};
    const animatedNumber = { animation: "animatedNumber 1s infinite"};

    return (
        <div className="col-container" id={props.column.id}
         style={(props.lado===props.column.id && props.paso==='reducir' && props.animar)?animatedNumber:normalNumber}>
            {/*<div className="col-title">{props.column.title}</div>*/}
            <Droppable droppableId={props.column.id}
             direction = 'horizontal' 
             type={props.column.id==='column-0'?'medio':'vale'}
             isDropDisabled={props.paso!=='transponer'}>
                {(provided,snapshot) => (<div className="task-list" 
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{...provided.droppableProps.style,
                        backgroundColor: snapshot.isDraggingOver ? 'lightgrey' : 'white',
                        paddingTop: props.paso!=='transponer'?'0px':'30px',
                        paddingBottom: props.paso!=='transponer'?'0px':'30px'}}>
                    {props.tasks.map((task,index) =>
                    <Task key={task.id} task={task} index={index}/>)}
                    {provided.placeholder}
                </div>)}
            </Droppable>
        </div>
        )
}

export default Column;