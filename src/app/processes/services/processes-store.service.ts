import { Injectable } from "@angular/core";
import { Observable, of, BehaviorSubject, combineLatest, pipe } from 'rxjs';
import { Process } from '../models';
import { ProcessesHttpService } from './processes-http.service';
import { tap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProcessesStoreService {

  private processSubject = new BehaviorSubject(null);
  process$ = this.processSubject.asObservable();

  private processesSubject = new BehaviorSubject([]);
  processes$ = this.processesSubject.asObservable();

  private sectionsSubject = new BehaviorSubject([]);
  sections$ = this.sectionsSubject.asObservable();

  private tasksSubject = new BehaviorSubject([]);
  tasks$ = this.tasksSubject.asObservable();

  private processSectionsSubject = new BehaviorSubject([]);
  processSections$ = this.processSectionsSubject.asObservable();

  constructor(
    private processesHttpService: ProcessesHttpService,
  ) { }

  setProcess(id: string) {
    this.processesHttpService
      .getProcessByKey(id)
      .pipe(
      ).subscribe(process => this.processSubject.next(process));
  }

  getProcessTemplates() {
    return this.processesHttpService.getProcessTemplates();
  }

  getTasksBySection() {
    this.process$
      .pipe(
        tap(process => {
          let sections = [];
          process.tasks.forEach(task => {
            sections.push(task.section.name);
          });
          sections = [...new Set(sections)];
          sections = sections.map(section => {
            return {
              name: section,
              tasks: [],
            }
          });

          process.tasks.forEach(task => {
            sections.forEach(section => {
              if (section.name === task.section.name) {
                section.tasks.push(task);
              }
            });
          });

          this.processSectionsSubject.next(sections);
        }),
      ).subscribe();
  }

  getProcess(key: string) {
    const process$ = this.processesHttpService.getProcessByKey(key)
    const sections$ = this.processesHttpService.getSections();
    const tasks$ = this.processesHttpService.getTasks();
    const data$ = combineLatest([process$, sections$, tasks$]);

    data$.pipe(
      map(([process, sections, tasks]) => {
        const processTasks = [];

        Object.keys(process.tasks).forEach(key => {
          const task = tasks.find(task => task.key === key);
          const section = sections.find(section => section.key === task.section);

          processTasks.push({
            ...task,
            section,
          });
        });

        return {
          ...process,
          tasks: processTasks,
        }

      }),
      tap(item => this.processSubject.next(item)),
    ).subscribe();
  }

  getProcesses() {
    const processes$ = this.processesHttpService.getProcesses();
    const sections$ = this.processesHttpService.getSections();
    const tasks$ = this.processesHttpService.getTasks();
    const data$ = combineLatest([processes$, sections$, tasks$]);

    data$.pipe(
      map(([processes, sections, tasks]) => {

        return processes.map(process => {
          const processTasks = [];

          Object.keys(process.tasks).forEach(key => {
            const task = tasks.find(task => task.key === key);
            const section = sections.find(section => section.key === task.section);

            processTasks.push({
              ...task,
              section,
            });
          });

          return {
            ...process,
            tasks: processTasks,
          }
        });

      }),
      tap(items => this.processesSubject.next(items)),
    ).subscribe();
  }

  getTasks() {
    this.processesHttpService.getTasks()
      .pipe(
        tap(items => this.tasksSubject.next(items)),
        tap(console.log),
      ).subscribe();
  }

  getSections() {
    this.processesHttpService.getSections()
      .pipe(
        tap(items => this.sectionsSubject.next(items)),
      ).subscribe();
  }

  createProcess(newProcess: Process) {
    this.processesHttpService.createProcess(newProcess);
  }

  updateTask(key: string, value: any) {
    this.processesHttpService.updateTask(key, value);
  }
}
