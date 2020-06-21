import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { filter, map } from 'rxjs/operators';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';

export interface Credentials {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userId;

  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  user$: Observable<firebase.User>;

  constructor(
    private fireAuth: AngularFireAuth,
    private db: AngularFireDatabase,
  ) {
    this.user$ = fireAuth.authState
      .pipe(
        tap(response => {
          if (response) {
            this.userId = response.uid;
            this.saveLogger('login', response.uid);
            this.getuserData();
          }
        }),
      );
  }

  login({ email, password }: Credentials) {
    const callback = this.fireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {

      });
    return callback;
  }

  logout() {
    const userId = this.userId;
    return this.fireAuth.auth.signOut().then(response => {
      if (userId) {
        this.saveLogger('logout', userId);
        this.userId = null;
      }
    });
  }

  getuserData() {
    const db: AngularFireObject<any> = this.db.object(`/users/${this.userId}`);

    db.snapshotChanges()
      .pipe(
        map((change) => ({ key: change.payload.key, ...change.payload.val() })),
      ).subscribe();
  }

  private saveLogger(operationType: string, userId: string) {
    const db: AngularFireList<any> = this.db.list(`/logger/${userId}/${operationType}`);
    const loggerItem = {
      datetime: new Date().toString(),
    };
    db.push(loggerItem);
  }
}
