import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Process } from '../models';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessesHttpService {

  private processes = [];

  constructor(
    private db: AngularFireDatabase,
  ) { }

  createProcess(newProcess: Process): Promise<any> {
    const db: AngularFireList<Process> = this.db.list(`/processes`);
    return db.push(newProcess);
  }

  getProcesses() {
    const db: AngularFireList<any> = this.db.list(`/processes`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
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

  getProcessByKey(key: string) {
    const db: AngularFireObject<any> = this.db.object(`/processes/${key}`);

    return db.snapshotChanges()
      .pipe(
        map((change) => ({ key: change.payload.key, ...change.payload.val() })),
        tap(response => {
          // console.log('one', response);
        }),
      );
  }
}