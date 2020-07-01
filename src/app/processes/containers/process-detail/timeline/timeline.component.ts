import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Task } from '@processes/models';

import * as fromServices from '@processes/store/services';

import { filter, tap, startWith } from 'rxjs/operators';

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

export interface RowItem {
  key: string;
  name: string;
  resource: string;
  startDate: Date;
  endDate: Date;
  duration: number;
  precentCompleted: number;
  dependencies: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements AfterViewInit, OnInit {

  rows = [];

  tasks$; // = this.processesStore.process$.subscribe();

  @ViewChild('main') mainHTML: ElementRef;

  constructor(
    private tasksService: fromServices.TasksFacadeService,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainHTML.nativeElement.style.opacity = '1';
    }, 100);
  }

  ngOnInit() {
    this.tasksService.tasks$
      .pipe(
        filter(tasks => Boolean(tasks)),
        tap((tasks: any[]) => {
          tasks.forEach((task: Task) => {
            const duration = daysToMilliseconds(2);
            const dependencies = task.dependencies || null;
            const startDate = task.startDate ? new Date(task.startDate) : null;
            const endDate = task.endDate ? new Date(task.endDate) : null;
            const row = [
              task.key,
              task.name,
              task.section.name,
              startDate,
              endDate,
              duration,
              0,
              dependencies,
            ];
            this.rows.push(row);
          });
        })
      ).subscribe();
  }


}
