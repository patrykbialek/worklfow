import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from 'firebase';
import { Observable } from 'rxjs';

export interface Credentials {
  email: string;
  password: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  readonly authState$: Observable<User | null> = this.fireAuth.authState;
  user$: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.user$ = fireAuth.authState;
  }

  login({ email, password }: Credentials) {
    const callback = this.fireAuth.auth.signInWithEmailAndPassword(email, password);
    return callback;
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }
}
