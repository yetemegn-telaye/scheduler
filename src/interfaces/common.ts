export interface ICalenderInput{
    year: number,
    month: number,
    day: number
    events:any
    
}

export interface Label {
    id: number;
    text: string;
    color: string;

  }

export interface Task {
  id: number;
  title: string;
  labels: Label[];
  date:any 
}

export interface TaskMap {
  [date: string]: Task[];
}
