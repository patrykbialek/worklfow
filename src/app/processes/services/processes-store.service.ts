import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Process } from '../models';
import { ProcessesHttpService } from './processes-http.service';


@Injectable({
  providedIn: 'root'
})
export class ProcessesStoreService {

  private processSubject = new BehaviorSubject(null);
  process$ = this.processSubject.asObservable();

  constructor(
    private processesHttpService: ProcessesHttpService,
  ) { }

  setProcess(id: string) {
    this.processesHttpService
      .getProcessByKey(id)
      .subscribe(process => this.processSubject.next(process));
  }

  getProcessTemplates() {
    return this.processesHttpService.getProcessTemplates();
  }
}
