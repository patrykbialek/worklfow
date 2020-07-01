import { Injectable } from "@angular/core";
import { Process } from '../models';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { map, delay, tap } from 'rxjs/operators';
import { of, Observable, from } from 'rxjs';
import { SectionsFacadeService, BoardsFacadeService } from '@shared/store/services';

@Injectable({
  providedIn: 'root'
})
export class TasksHttpService {
  sections;

  constructor(
    private db: AngularFireDatabase,
    private sectionsService: SectionsFacadeService,
  ) {
    this.sectionsService.sections$.subscribe(response => this.sections = response);
   }

  // Create

  createTask(newTask: any, processKey: string): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/tasks`);
    const taskRef = db.push(newTask);

    return taskRef;
  }

  // Read

  getTasks(processId?: string) {
    const db: AngularFireList<any> = this.db.list(`/tasks`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
      map(tasks => tasks.filter(task => task.process === processId)),
      map(tasks => {
        tasks = tasks.map(task => {
          const section = this.sections.find(section => section.key === task.section);
          return {
            ...task,
            section,
          };
        })
        return tasks;
      })
    );
  }

  // Update

  updateTask(key: string, value: any): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/tasks`);
    return db.update(key, value);
  }
}