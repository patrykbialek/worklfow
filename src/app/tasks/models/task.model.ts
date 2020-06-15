export interface Task {
  id: string;
  assignee: string;
  endDate: string;
  startDate: string;
  processes: string[];
  priority: string;
  description: string;
  isCompleted: boolean;
  subtasks: string[];
  name: string;
}
