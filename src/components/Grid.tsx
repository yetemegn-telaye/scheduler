import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format } from 'date-fns';
import './CalendarGrid.css';
import WeekdayHeader from './WeekDayHeader';
import DayBox  from './DayBox';

export interface Label {
    id: number;
    text: string;
    color: string;

  }

export interface Task {
  id: number;
  title: string;
  labels: Label[]; // Array of labels
}

interface TaskMap {
  [date: string]: Task[];
}


const MonthCalendar: React.FC = () => {

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedLabels, setSelectedLabels] = useState<Label[]>([])
  const [labels, setLabels] = useState<Label[]>([
    // Example labels
    { id: 1, text: 'Urgent', color: 'red' },
    { id: 2, text: 'Work', color: 'blue' },
    // Add more labels as needed
  ]);

  const handleCreateLabel = (newLabel: Label) => {
    setLabels(prev => [...prev, newLabel]);
  };
  
  const handleEditLabel = (updatedLabel: Label) => {
    setLabels(prev => prev.map(label => label.id === updatedLabel.id ? updatedLabel : label));
  };
  
  const handleFilterByLabel = (label: Label) => {
    setSelectedLabels(prev => {
      if (prev.includes(label)) {
        return prev.filter(l => l.id !== label.id);
      } else {
        return [...prev, label];
      }
    });
  };
  

  const [tasks, setTasks] = useState<TaskMap>({
    [format(new Date(), 'yyyy-MM-dd')]: [
      { id: 1, title: 'Task 1',labels: [labels[0], labels[1]]},
      { id: 2, title: 'Task 2',labels: [labels[1]]},
      // Add more tasks for specific dates as needed
    ],
    // Additional dates and their tasks...
  });

  

  const monthYear = format(currentMonth, 'MMMM yyyy');
  const startDay = startOfWeek(startOfMonth(currentMonth));
  const endDay = endOfWeek(endOfMonth(currentMonth));

  const moveTaskToDay = (taskId: number, newDate: Date, dropIndex: number) => {
    const newDateString = format(newDate, 'yyyy-MM-dd');
    let updatedTasks = { ...tasks };

    let currentTaskDate = '';
    let currentTask: Task | null = null;
    for (const [dateString, taskArray] of Object.entries(updatedTasks)) {
      const foundTaskIndex = taskArray.findIndex(task => task.id === taskId);
      if (foundTaskIndex !== -1) {
        currentTask = taskArray[foundTaskIndex];
        currentTaskDate = dateString;
        taskArray.splice(foundTaskIndex, 1); // Remove the task from its current position
        break;
      }
    }

    if (currentTask) {
      if (!updatedTasks[newDateString]) {
        updatedTasks[newDateString] = [];
      }

      updatedTasks[newDateString].splice(dropIndex, 0, currentTask); // Insert the task at the new position

      setTasks(updatedTasks);
    }
  };

  const days = [];
  for (let day = startDay; day <= endDay; day = addDays(day, 1)) {
    const dayString = format(day, 'yyyy-MM-dd');
    days.push(
      <DayBox
        key={day.toISOString()}
        date={day}
        allTasks = {tasks}
        setTask={setTasks}
        tasks={tasks[dayString] || []}
        onDropTask={moveTaskToDay}
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
      {JSON.stringify(tasks)}
      <h2>{monthYear}</h2>
      <WeekdayHeader />
      <div className="month-grid">
        {days}
      </div>
    </div>
  );
};

export default MonthCalendar;
