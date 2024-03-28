// reducers.ts
import { Action } from './action';
import { ADD_TASK, MOVE_TASK, DELETE_TASK } from './actionTypes';
import { format } from 'date-fns';

const initialState = {
  tasks: {
    [format(new Date(), 'yyyy-MM-dd')]: [
      { id: 1, title: 'Task 1',labels: [  { id: 1, text: 'Urgent 😪', color: 'red' },  { id: 2, text: 'chill☺️', color: 'blue' }]},
      { id: 2, title: 'Task 2',labels: [ { id: 1, text: 'Urgent 😪', color: 'red' },  { id: 2, text: 'chill☺️', color: 'blue' }]},
      { id: 3, title: 'Task 3',labels: [ { id: 1, text: 'Urgent 😪', color: 'red' },  { id: 2, text: 'chill☺️', color: 'blue' }]},
      // Add more tasks for specific dates as needed
    ],
    // Additional dates and their tasks...
  },
};

function rootReducer(state = initialState, action:Action) {
  switch (action.type) {
    case ADD_TASK:
      // Logic to add task

      const { title, labels } = action.payload;
      const date = format(new Date(), 'yyyy-MM-dd');
      const newTask = { id: Math.random(), title, labels };
      const newUpdatedTasks = { ...state.tasks };

      if (!newUpdatedTasks[date]) {
        newUpdatedTasks[date] = [];
      }
      newUpdatedTasks[date].push(newTask);
      return { ...state, tasks: newUpdatedTasks };
      
    case MOVE_TASK:
      // Logic to move task
      const { taskId, newDate } = action.payload;
      const newDateString = format(newDate, 'yyyy-MM-dd');
      
      let updatedTasks = { ...state.tasks };
      let currentTaskDate = '';
      let currentTask = null;
        
      for (const [dateString, taskArray] of Object.entries(updatedTasks)) {
        const foundTaskIndex = taskArray.findIndex(task => task.id === taskId);
        if (foundTaskIndex !== -1) {
          currentTask = taskArray[foundTaskIndex];
          currentTaskDate = dateString;
          taskArray.splice(foundTaskIndex, 1); // Remove the task from its current position
          break;
        }
      }

      if(currentTask) {
        if (!updatedTasks[newDateString]) {
          updatedTasks[newDateString] = [];
        }
        updatedTasks[newDateString].push(currentTask); 
        return { ...state, tasks: updatedTasks };
      }

      
     
      return state;
    case DELETE_TASK:
      // Logic to delete task
      
      const taskIdToDelete = action.payload;
      let tasks = { ...state.tasks };
      for (const [dateString, taskArray] of Object.entries(tasks)) {
        const foundTaskIndex = taskArray.findIndex(task => task.id === taskIdToDelete);
        if (foundTaskIndex !== -1) {
          taskArray.splice(foundTaskIndex, 1); // Remove the task from its current position
          break;
        }
      }
      return { ...state, tasks };
    default:
      return state;
  }
}

export default rootReducer;

