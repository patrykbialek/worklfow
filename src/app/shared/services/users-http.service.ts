import { Injectable } from "@angular/core";

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { map, delay, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersHttpService {

  private usersSubject = new BehaviorSubject(null);
  users$ = this.usersSubject.asObservable();

  constructor(
    private db: AngularFireDatabase,
  ) { }

  // Read

  getUsers() {
    const db: AngularFireList<any> = this.db.list(`/users`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
      tap(response => this.usersSubject.next(response)),
    );
  }

}