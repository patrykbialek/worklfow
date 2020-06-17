import { Injectable } from "@angular/core";
import { BehaviorSubject, combineLatest, } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';

import { ProcessesHttpService } from '../services/processes-http.service';
import * as fromModels from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProcessesStoreService {

  private processSubject = new BehaviorSubject(null);
  process$ = this.processSubject.asObservable();

  private processSectionsSubject = new BehaviorSubject([]);
  processSections$ = this.processSectionsSubject.asObservable();

  private processesSubject = new BehaviorSubject([]);
  processes$ = this.processesSubject.asObservable();

  private sectionsSubject = new BehaviorSubject([]);
  sections$ = this.sectionsSubject.asObservable();

  private tasksSubject = new BehaviorSubject([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor(
    private processesHttpService: ProcessesHttpService,
  ) { }

  setProcess(id: string) {
    this.processesHttpService
      .getProcessByKey(id)
      .pipe(
      ).subscribe(process => this.processSubject.next(process));
  }

  // GET

  getProcessTemplates() {
    return this.processesHttpService.getProcessTemplates();
  }

  getTaskTemplates() {
    return this.processesHttpService.getTaskTemplates();
  }

  getTasksBySection() {
    this.process$
      .pipe(
        filter(process => Boolean(process)),
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

        if (process.tasks) {
          Object.values(process.tasks).forEach(key => {
            const task = tasks.find(task => task.key === key);
            const section = sections.find(section => section.key === task.section);

            processTasks.push({
              ...task,
              section,
            });
          });
        }

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
      filter(([processes, sections, tasks]) => Boolean(tasks)),
      map(([processes, sections, tasks]) => {

        return processes.map(process => {
          const processTasks = [];

          if (process.tasks) {
            Object.values(process.tasks).forEach(key => {
              const task = tasks.find(task => {
                return task.key === key;
              });
              const section = sections.find(section => section.key === task.section);

              processTasks.push({
                ...task,
                section,
              });
            });
          }

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
      ).subscribe();
  }

  getSections() {
    this.processesHttpService.getSections()
      .pipe(
        tap(items => this.sectionsSubject.next(items)),
      ).subscribe();
  }

  // CREATE

  createTask(newTask: fromModels.Task) {
    this.processesHttpService.createTask(newTask, null)
  }

  createProcess(newProcess: fromModels.Process) {
    this.processesHttpService.createProcess(newProcess);
  }

  // UPDATE

  updateTask(key: string, value: any) {
    this.processesHttpService.updateTask(key, value);
  }
}
