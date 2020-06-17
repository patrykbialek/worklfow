import { Injectable } from "@angular/core";
import { Process } from '../models';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { map } from 'rxjs/operators';

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
    return db.push(newProcess);
  }

  createSection(newSection: any): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/sections`);
    return db.push(newSection);
  }

  createTask(newTask: any): Promise<any> {
    const db: AngularFireList<any> = this.db.list(`/tasks`);
    return db.push(newTask);
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