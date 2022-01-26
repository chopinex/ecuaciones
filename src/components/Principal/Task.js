import React from 'react'
import {Draggable} from 'react-beautiful-dnd'
import './Task.css'

const Task = (props) =>{
	return (
		<Draggable draggableId={props.task.id} index={props.index}>
			{(provided,snapshot) => (<div className="task"
			 ref={provided.innerRef}
			{...provided.draggableProps}
			 style={{...provided.draggableProps.style,backgroundColor: snapshot.isDragging ? 'yellow' : 'white'}}
			{...provided.dragHandleProps}
			>
				{props.task.content}
			</div>)}
		</Draggable>
		)
}

export default Task;