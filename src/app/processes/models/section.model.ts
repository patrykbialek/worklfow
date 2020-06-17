import { Task } from './task.model';

export interface Section {
  name: string;
  tasks: Task[];
}
