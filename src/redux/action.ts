// actions.ts
import { Task } from '../interfaces/common';
import { ADD_TASK, MOVE_TASK, DELETE_TASK } from './actionTypes';



export interface Action {
  type: string;
  payload: any;
}

// Action to add a new task
export const addTask = (task:Task) => ({
  type: ADD_TASK,
  payload: task,
});

// Action to move a task to a new day
export const moveTask = (taskId:number|string, newDate:any) => ({
  type: MOVE_TASK,
  payload: { taskId, newDate },
});

// Action to delete a task
export const deleteTask = (taskId: number) => ({
  type: DELETE_TASK,
  payload: taskId ,
});

