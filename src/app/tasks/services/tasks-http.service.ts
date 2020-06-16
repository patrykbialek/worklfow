import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Task } from '../models';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { tap, map } from 'rxjs/operators';

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
    section: 'Dział Rozliczeń CIT',
  },
  {
    id: '33fdfeer',
    assignee: 'Janusz Popanusz',
    endDate: '2020-06-30T12:00',
    startDate: '2020-06-15T12:00',
    processes: ['6454dgdfgd11', '6454dgdfgd11'],
    priority: 'high',
    description: 'no description',
    isCompleted: true,
    subtasks: [],
    name: 'Sprawdzić faktury',
    section: 'Dział Rozliczeń CIT',
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
    section: 'Dział Rozliczeń VAT',
  },
  {
    id: 'sdfs2323',
    assignee: null,
    endDate: '2020-06-30T12:00',
    startDate: '2020-06-15T12:00',
    processes: ['6454dgdfgd11', '6454dgdfgd11'],
    priority: 'high',
    description: 'no description',
    isCompleted: false,
    subtasks: [],
    name: 'Sprawdzić faktury',
    section: 'Dział Rozliczeń VAT',
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
    section: 'Dział Kadr',
  },
];
@Injectable({
  providedIn: 'root'
})
export class TasksHttpService {

  constructor(
    private db: AngularFireDatabase,
  ) {}

  getAllTasks(): Observable<Task[]> {
    const allTasks = tasks;
    return of(allTasks);
  }

  getAllTasksBySections(): Observable<any[]> {
    const tasksBySections = [
      {
        section: 'Dział Rozliczeń CIT',
        tasks: [
          {
            id: '6454dgdfgd',
            assignee: 'Janusz Popanusz',
            endDate: '2020-06-30T12:00',
            startDate: '2020-06-15T12:00',
            processes: ['6454dgdfgd11', '6454dgdfgd11'],
            priority: 'high',
            description: 'no description',
            isCompleted: true,
            subtasks: [],
            name: 'Przygotować zestawienie CIT',
            section: 'Dział Rozliczeń CIT',
          },
          {
            id: '33fdfeer',
            assignee: 'Janusz Popanusz',
            endDate: '2020-06-30T12:00',
            startDate: '2020-06-15T12:00',
            processes: ['6454dgdfgd11', '6454dgdfgd11'],
            priority: 'high',
            description: 'no description',
            isCompleted: false,
            subtasks: [],
            name: 'Sprawdzić faktury',
            section: 'Dział Rozliczeń CIT',
          },
        ]
      },
      {
        section: 'Dział Rozliczeń VAT',
        tasks: [
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
            section: 'Dział Rozliczeń VAT',
          },
          {
            id: 'sdfs2323',
            assignee: 'Janusz Popanusz',
            endDate: '2020-06-30T12:00',
            startDate: '2020-06-15T12:00',
            processes: ['6454dgdfgd11', '6454dgdfgd11'],
            priority: 'high',
            description: 'no description',
            isCompleted: false,
            subtasks: [],
            name: 'Sprawdzić faktury',
            section: 'Dział Rozliczeń VAT',
          },
        ]
      },
      {
        section: 'Dział Kadr',
        tasks: [
          {
            id: '5454554dgdfgd',
            assignee: null,
            endDate: null,
            startDate: '2020-06-15T12:00',
            processes: ['6454dgdfgd11', '6454dgdfgd11'],
            priority: 'high',
            description: 'no description',
            isCompleted: false,
            subtasks: [],
            name: 'Przygotować listę płac',
            section: 'Dział Kadr',
          },
        ]
      },
    ];

    return of(tasksBySections);
  }
}