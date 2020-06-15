import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Task } from '../models';


@Injectable({
  providedIn: 'root'
})
export class TasksHttpService {

  getTasks(): Observable<Task[]> {
    const tasks: Task[] = [
      {
        id: '6454dgdfgd',
        assignee: 'Janusz Popanusz',
        endDate: '2020-06-30T12:00',
        startDate: '2020-06-15T12:00',
        processes: ['6454dgdfgd11', '6454dgdfgd11'],
        priority: 'high',
        description: 'no description',
        isCompleted: false,
        subtasks: [],
        name: 'Przygotować zestawienie CIT',
      },
      {
        id: '444454dgdfgd',
        assignee: 'Janusz Popanusz',
        endDate: '2020-06-30T12:00',
        startDate: '2020-06-15T12:00',
        processes: ['6454dgdfgd11', '6454dgdfgd11'],
        priority: 'high',
        description: 'no description',
        isCompleted: false,
        subtasks: [],
        name: 'Przygotować zestawienie VAT',
      },
      {
        id: '5454554dgdfgd',
        assignee: 'Janusz Popanusz',
        endDate: '2020-06-30T12:00',
        startDate: '2020-06-15T12:00',
        processes: ['6454dgdfgd11', '6454dgdfgd11'],
        priority: 'high',
        description: 'no description',
        isCompleted: false,
        subtasks: [],
        name: 'Przygotować listę płac',
      },
    ];
    return of(tasks);
  }
}