import { Injectable } from "@angular/core";
import { Process } from '../models';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessesHttpService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  // Create

  createProcess(newProcess: Process): Promise<any> {
    const db: AngularFireList<Process> = this.db.list(`/processes`);
    const tasks = Object.values(newProcess.tasks);
    delete newProcess.tasks;
    const newRef = db.push(newProcess);

    // console.log(newProcess.tasks);
    tasks.forEach((task: any) => {
      const today = new Date();
      const newTask = {
        board: task.board,
        created: today.toISOString(),
        isCompleted: false,
        name: task.name,
        section: task.section,
        startDate: today.toISOString(),
      };
      this.createTask(newTask, newRef.key)
    });

    return newRef;
  }

  createSection(newSection: any): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/sections`);
    return db.push(newSection);
  }

  createTask(newTask: any, processKey: string): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/tasks`);
    const taskRef = db.push(newTask);

    const tasks: AngularFireList<any> = this.db.list(`/processes/${processKey}/tasks`);
    tasks.push(taskRef.key);

    return taskRef;
  }

  createTemplate(newTemplate: any): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/processTemplates`);
    return db.push(newTemplate);
  }

  // Read

  getProcesses() {
    const db: AngularFireList<any> = this.db.list(`/processes`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
      // delay(3000),
    );
  }

  getProcessByKey(key: string) {
    const db: AngularFireObject<any> = this.db.object(`/processes/${key}`);

    return db.snapshotChanges()
      .pipe(
        map((change) => ({ key: change.payload.key, ...change.payload.val() })),
      );
  }

  getProcessTemplates() {
    const db: AngularFireList<any> = this.db.list(`/processTemplates`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
    );
  }

  getTaskTemplates() {
    const db: AngularFireList<any> = this.db.list(`/taskTemplates`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
    );
  }

  getSections() {
    const db: AngularFireList<any> = this.db.list(`/sections`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
    );
  }

  getTasks() {
    const db: AngularFireList<any> = this.db.list(`/tasks`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
    );
  }

  // Update

  updateTask(key: string, value: any): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/tasks`);
    return db.update(key, value);
  }

  // getTemplateTasks() {
  //   const key = 'tasks';
  //   const rootRef = this.db.database.ref();
  //   const templatesRef = rootRef.child('processTemplates/-MA0811bIUULkFeAJFun');
  //   const tasksRef = rootRef.child('tasks');

  //   function getTasks(key, cb) {
  //     templatesRef.child(key).on('child_added', snap => {
  //       let taskRef = tasksRef.child(snap.key);
  //       taskRef.once('value', cb);
  //     });
  //   }

  //   let tasks = []
  //   getTasks(key, snap => tasks.push(snap.val()))

  //   return of(tasks);

  //   // templatesRef.child(key).once('value', snap => console.log(snap.val().tasks))

  //   // const db: AngularFireList<any> = this.db.list(`/processTemplates/-MA0811bIUULkFeAJFun/tasks`);

  //   // return db.snapshotChanges().pipe(
  //   //   map((changes) =>
  //   //     changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
  //   //   ),
  //   // );
  // }
}