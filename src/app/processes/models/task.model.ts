export interface Task {
  id: string;
  assignee: any;
  description: string;
  // endDate: string;
  endDate: Date;
  isCompleted: boolean;
  key: string;
  name: string;
  priority: string;
  processes: string[];
  section: any;
  startDate: Date;
  subtasks: string[];
  dependencies?: string;
  userId?: string;
}
