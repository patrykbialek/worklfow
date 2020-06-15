import { Injectable } from "@angular/core";
import { Observable, of } from 'rxjs';
import { Process } from '../models';

const processes: Process[] = [
  {
    id: '44rdf2323',
    name: 'Zamknięcie miesiąca kwiecień 2020',
    startDate: '2020-05-15T12:00',
    endDate: '2020-05-30T12:00',
    team: null,
    description: null,
  },
  {
    id: '6454dgdfgd',
    name: 'Zamknięcie miesiąca maj 2020',
    startDate: '2020-06-15T12:00',
    endDate: '2020-06-30T12:00',
    team: null,
    description: null,
  },
];

@Injectable({
  providedIn: 'root'
})
export class ProcessesHttpService {

  private processes = [];

  getProcesses(): Observable<Process[]> {
    this.processes = processes;

    return of(processes);
  }

  getProcessById(id: string) {
    const process = processes.find(item => item.id === id);
    return process;
  }
}