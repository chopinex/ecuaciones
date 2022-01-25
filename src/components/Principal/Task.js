import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import './Task.css'

const Task = (props) =>{
	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{(provided) => (<div className="task"
			 ref={provided.innerRef}
			{...provided.draggableProps}
			{...provided.dragHandleProps}>
				{props.task.content}
			</div>)}
		</Draggable>
		)
}

export default Task;