import React from 'react'
import {Droppable} from 'react-beautiful-dnd'
import './Column.css'
import Task from './Task'

const Column = (props) =>{
    return (
        <div className="col-container">
            <div className="col-title">{props.column.title}</div>
            <Droppable droppableId={props.column.id}>
            {(provided) => (<div className="task-list" ref={provided.innerRef} {...provided.droppableProps}>
                {props.tasks.map((task,index) =>
                <Task key={task.id} task={task} index={index}/>)}
                {provided.placeholder}
            </div>)}
            </Droppable>
        </div>
        )
}

export default Column;