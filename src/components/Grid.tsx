import React, { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format, set } from 'date-fns';
import './CalendarGrid.css';
import WeekdayHeader from './WeekDayHeader';


import useCalendarDays from '../hooks/useCalenderDays';
import { addTask,deleteTask } from '../redux/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const MonthCalendar: React.FC = () => {
  const[selectedDate, setSelectedDate] = useState<Date>(new Date());
  const dispatch = useDispatch();
  

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const monthYear = format(currentMonth, 'MMMM yyyy');
  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));

 
  const addTaskToTest = (taskId: number, newDate: Date) => {
    dispatch(addTask({
      id: Math.random(),
      title: 'Task new',
      labels: [ { id: 1, text: 'Urgent 😪', color: 'red' },  { id: 2, text: 'chill☺️', color: 'blue' }],
    }));

};

  

  const days = useCalendarDays({ startDay, endDay}).renderDays();

  return (
    <div className="calendar m-3">
<div className="flex justify-between items-center">
    <button 
        onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-l-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none"
    >
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 inline-block mr-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M15 19l-7-7 7-7"
            />
        </svg>
        Previous Month
    </button>

    <div className="text-xl font-bold text-white">{monthYear}</div>

    <button 
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-r-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none ml-4"
    >
        Next Month
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 inline-block ml-2" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
        >
            <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 5l7 7-7 7"
            />
        </svg>
    </button>
</div>

      <WeekdayHeader />
      <div className="month-grid">
        {days}
      </div>
    </div>
  );
};

export default MonthCalendar;
