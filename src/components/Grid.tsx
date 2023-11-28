import React, { useState } from 'react';
import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, addMonths, format } from 'date-fns';
import './CalendarGrid.css';

interface Task {
  id: number;
  title: string;
  description: string;
}

interface TaskMap {
  [date: string]: Task[];
}

interface DayProps {
  date: Date;
  tasks: Task[];
  onDropTask: (taskId: number, date: Date, dropIndex: number) => void;
}

const TaskCard: React.FC<{ task: Task, index: number }> = ({ task, index }) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ taskId: task.id, index }));
  };

  return (
    <div
      draggable="true"
      onDragStart={handleDragStart}
      className="task-card"
    >
      <div className="task-title">{task.title}</div>
      <div className="task-description">{task.description}</div>
    </div>
  );
};

const DayBox: React.FC<DayProps> = ({ date, tasks, onDropTask }) => {
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
        {tasks.map((task, index) => (
          <TaskCard key={task.id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
};

function determineDropIndex(dropY:any, tasksCount:any) {
  // This is a simplistic way to determine the drop index based on the Y position.
  // For a more accurate approach, you would calculate the position of each task element.
  return Math.min(Math.floor(dropY / 100), tasksCount - 1); // Assuming each task has an approximate height of 100px
}

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
  const [tasks, setTasks] = useState<TaskMap>({
    [format(new Date(), 'yyyy-MM-dd')]: [
      { id: 1, title: 'Task 1', description: 'Description 1' },
      { id: 2, title: 'Task 2', description: 'Description 1' },
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
      <h2>{monthYear}</h2>
      <WeekdayHeader />
      <div className="month-grid">
        {days}
      </div>
    </div>
  );
};

export default MonthCalendar;
