import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppSpinnerService {

  private spinnerSubject = new BehaviorSubject(false);
  isShown$ = this.spinnerSubject.asObservable();

  hide() {
    this.spinnerSubject.next(false);
  }
  
  show() {
    this.spinnerSubject.next(true);
  }
}