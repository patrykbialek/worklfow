export interface Task {
  id: string;
  assignee: any;
  board: any;
  description: string;
  // endDate: string;
  endDate: Date | string;
  isCompleted: boolean;
  key: string;
  name: string;
  priority: string;
  processes: string[];
  section: any;
  startDate: Date | string;
  subtasks: string[];
  dependencies?: string;
  userId?: string;
}
