import React from 'react'
import './Column.css'

const Column = (props) =>{
    return (
        <div className="col-container">
            <div className="col-title">{props.column.title}</div>
            <div className="task-list">{props.tasks.map(task =>
                <div className="task" key={task.id}>{task.content}</div>)}</div>
        </div>
        )
}

export default Column;