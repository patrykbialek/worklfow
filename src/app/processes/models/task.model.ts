export interface Task {
  id: string;
  assignee: string;
  description: string;
  endDate: string;
  isCompleted: boolean;
  key: string;
  name: string;
  priority: string;
  processes: string[];
  section: any;
  startDate: string;
  subtasks: string[];
}
