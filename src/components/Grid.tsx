import React, { useEffect, useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format, set } from 'date-fns';
import './CalendarGrid.css';
import WeekdayHeader from './WeekDayHeader';


import useCalendarDays from '../hooks/useCalenderDays';
import { addTask,deleteTask } from '../redux/action';
import { useDispatch } from 'react-redux';

const MonthCalendar: React.FC = () => {
  const [modal, setModal] = useState(false);
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
useEffect(() => {
  dispatch(addTask({
    id: Math.random(),
    title: 'Task new',
    labels: [ { id: 1, text: 'Urgent 😪', color: 'red' },  { id: 2, text: 'chill☺️', color: 'blue' }],
  }));
  dispatch(deleteTask(1));
}, []);

  const openAddTaskModal = (date:any) => {
    setModal(true);
    setSelectedDate(date);
  }

  const days = useCalendarDays({ startDay, endDay,openAddTaskModal}).renderDays();

  return (
    <div className="calendar">
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
        Previous Month
      </button>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        Next Month
      </button>
      {/* {JSON.stringify(tasks)} */}
      <h2>{monthYear}</h2>
      <div>
        <input type="text" placeholder="Task title" />
        <button onClick={() => addTaskToTest(1, selectedDate)}>Add Task</button>
      </div>
      <WeekdayHeader />
      <div className="month-grid">
        {days}
      </div>
    </div>
  );
};

export default MonthCalendar;
