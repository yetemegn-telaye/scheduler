import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format } from 'date-fns';
import  './CalendarGrid.css';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface DayProps {
  date: Date;
  tasks: Task[];
}

const DayBox: React.FC<DayProps> = ({ date, tasks }) => (
  <div className="day-box">
    <div className="date">{format(date, 'd')}</div>
    <h2></h2>
  </div>
);

const WeekdayHeader: React.FC = () => {
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return (
      <div className="weekdays-header">
        {weekdays.map(day => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>
    );
  };

const MonthCalendar: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const monthYear = format(currentMonth, 'MMMM yyyy');
  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));

  const days = [];
  for (let day = startDay; day <= endDay; day = addDays(day, 1)) {
    days.push(
      <DayBox 
        key={day.toISOString()} 
        date={day} 
        tasks={[]} // Fetch tasks for the day here
      />
    );
  }

  return (
    <div className="calendar">
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, -1))}>
        Previous Month
      </button>
      <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}>
        Next Month
      </button>
    <h2>{monthYear}</h2>
      <WeekdayHeader />
      <div className="month-grid">
        {days}
      </div>
    </div>
  );
};

export default MonthCalendar;
