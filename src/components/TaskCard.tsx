import React from 'react';
import './CalendarGrid.css';


interface Task {
  id: number;
  title: string;
 labels: Label[]; // Array of labels
}


 interface Label {
    id: number;
    text: string;
    color: string;

  }



export const TaskCard: React.FC<any> = ({ task,setTask, index,allTasks,date }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId: task.id, index }));
  };
  const makeEditable = (e:any) => {
    e.target.contentEditable = true;
  }

  const handleTaskUpdate = (taskId:number, title:string) => {
    var prevTaskList = allTasks[date];
    var taskToUpdate = prevTaskList.find((task:any) => task.id === taskId);
    taskToUpdate.title = title;
    // setTask(prev => ({...prev, [date]: prevTaskList}));
      
  }
  return (
    <div draggable="true" onDragStart={handleDragStart} className="task-card">
          <div className="task-labels">

      {task.labels.map((label:any) => (
       <span key={label.id} title={label.text} className="label-color-box" style={{ backgroundColor: label.color }}></span>

      ))}
    </div>
   
      <div className="task-title" onClick={(e)=>{makeEditable(e)}} onBlur={(e)=>{handleTaskUpdate(task.id,e.target.innerText)}}>{task.title}</div>    

    

    </div>
  );
};
