// actions.ts
import { Task } from '../interfaces/common';
import { ADD_TASK, MOVE_TASK, DELETE_TASK, TOGGLE_MODAL, SELECT_DATE } from './actionTypes';



export interface Action {
  type: string;
  payload: any;
}

// Action to add a new task
export const addTask = (task: Partial<Task>) => ({
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

export const toggleModal = (modalState: boolean) => ({
  type: TOGGLE_MODAL,
  payload: modalState,
});

// action creators
export const selectDate = (date: Date) => ({
  type: SELECT_DATE,
  payload: date
});
