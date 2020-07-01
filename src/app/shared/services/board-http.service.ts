import { Injectable } from "@angular/core";
// import { Process } from '../models';

import {
  AngularFireDatabase,
  AngularFireObject,
  AngularFireList,
} from '@angular/fire/database';
import { map, delay, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardsHttpService {

  constructor(
    private db: AngularFireDatabase,
  ) { }

  // Read

  getBoards() {
    const db: AngularFireList<any> = this.db.list(`/settings/boards`);

    return db.snapshotChanges().pipe(
      map((changes) =>
        changes.map((change) => ({ key: change.payload.key, ...change.payload.val() }))
      ),
      map(items => {
        return items.sort(this.compare);
      }),
    );
  }

  compare(first, second) {
    const orderFirst = first.order;
    const orderSecond = second.order;

    let comparison = 0;
    if (orderFirst > orderSecond) {
      comparison = 1;
    } else if (orderFirst < orderSecond) {
      comparison = -1;
    }
    return comparison;
  }

}