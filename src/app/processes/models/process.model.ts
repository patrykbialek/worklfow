export interface Process {
  created: Date;
  description: string;
  endDate: Date;
  image: string;
  name: string;
  id?: string;
  key?: string;
  owner?: string;
  startDate?: Date;
  team?: string;
  tasks?: any;
}
