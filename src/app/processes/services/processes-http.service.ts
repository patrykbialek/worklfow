import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Process } from '../models';


@Injectable({
  providedIn: 'root'
})
export class ProcessesHttpService {

  getProcesses(): Observable<Process[]> {
    const processes: Process[] = [
      {
        id: '6454dgdfgd',
        name: 'Zamknięcie miesiąca maj 2020',
        startDate: '2020-06-15T12:00',
        endDate: '2020-06-30T12:00',
        team: null,
        description: null,
      },
    ];
    return of(processes);
  }
}