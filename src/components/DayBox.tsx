import React from 'react';
import { Task } from "../interfaces/common";
import { format } from 'date-fns';
import { TaskCard } from "./TaskCard";
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../redux/action';
import { selectedDate } from '../redux/action';


interface DayProps {
  date: Date;
  tasks: Task[];
  onDropTask: (taskId: number, date: Date, dropIndex: number) => void;
  openAddTaskModal: (date: Date) => void;
}

const determineDropIndex = (dropY: number, tasksCount: number) => {
  return Math.min(Math.floor(dropY / 100), tasksCount - 1);
};

const DayBox: React.FC<DayProps> = ({ date, tasks, onDropTask }) => {
  const selectedDate = useSelector((state: any) => state.selectedDate);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const { taskId, index } = JSON.parse(e.dataTransfer.getData('text/plain'));
    const dropIndex = determineDropIndex(e.clientY, tasks.length);
    onDropTask(taskId, date, dropIndex);
  };
  const openAddTaskModal= (date: Date)=> {
    dispatch(toggleModal(true));
  }

  const selectDate = (date: Date) => {
    dispatch(selectedDate(date));
  }

  return (
    <div
      className="bg-gray-100 rounded-lg p-4 shadow-md flex flex-col space-y-2 relative"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="text-gray-700 font-bold">{format(date, 'd')}</div>
      <div className="flex-1 space-y-2 overflow-auto">
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} date={format(date, 'yyyy-MM-dd')} index={index} />
        ))}
      </div>
      <button
        className="absolute top-2 right-2 text-blue-500 hover:text-blue-700"
        onClick={() => {
          
          openAddTaskModal(date)}}
      >
        <svg className="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default DayBox;
