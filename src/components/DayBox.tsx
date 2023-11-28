import { Task } from "./Grid";
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format } from 'date-fns';
import { TaskCard } from "./TaskCard";

function determineDropIndex(dropY:any, tasksCount:any) {
  
    return Math.min(Math.floor(dropY / 100), tasksCount - 1); 
  }

  interface DayProps {
    date: Date;
    setTask:any;
    tasks: Task[];
    onDropTask: (taskId: number, date: Date, dropIndex: number) => void;
  }

const DayBox: React.FC<any> = ({ date,setTask, tasks, onDropTask,allTasks }) => {
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
    };

  
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const { taskId, index } = JSON.parse(e.dataTransfer.getData('text/plain'));
      const dropIndex = determineDropIndex(e.clientY, tasks.length);
      onDropTask(taskId, date, dropIndex);
    };
  
    return (
      <div
        className="day-box"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="date">{format(date, 'd')}</div>
        <div className="tasks">
          {tasks.map((task:any, index:any) => (
            <TaskCard setTask={setTask} key={task.id} task={task} date={date} allTasks={allTasks} index={index} />
          ))}
        </div>
      </div>
    );
  };

  export default DayBox;