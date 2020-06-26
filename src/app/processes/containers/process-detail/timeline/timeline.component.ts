import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ProcessesStoreService } from '@processes/store/processes-store.service';
import { Task } from '@processes/models';

import * as moment from 'moment';

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
    private processesStore: ProcessesStoreService,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainHTML.nativeElement.style.opacity = '1';
    }, 100);
  }

  ngOnInit() {
    // this.rows = [
    //   ['t1', 'Zadanie 1', 'Zakupy', new Date(), null, daysToMilliseconds(2), 75, null],
    //   ['t2', 'Zadanie 2', 'Zakupy', null, null, daysToMilliseconds(1), 6, 't1'],
    //   ['t3', 'Zadanie 3', 'Księgowość', null, null, daysToMilliseconds(2), 0, 't2'],
    //   ['t4', 'Zadanie 4', 'Zakupy', null, null, daysToMilliseconds(2), 0, 't3, t2'],
    //   ['t5', 'Zadanie 5', 'Kadry', null, null, daysToMilliseconds(2), 0, null],
    //   ['t6', 'Zadanie 6', 'Księgowość', null, null, daysToMilliseconds(3), 0, null],
    //   ['t7', 'Zadanie 7', 'Księgowość', new Date(2020, 5, 15), null, daysToMilliseconds(1), 0, null],
    // ];

    this.processesStore.process$.subscribe((response: any) => {
      const tasks = response.tasks;
      tasks.forEach((task: Task) => {
        const duration = daysToMilliseconds(2);
        const dependencies = task.dependencies || null;
        const row = [
          task.key,
          task.name,
          task.section.name,
          new Date(task.startDate),
          new Date(task.endDate),
          duration,
          0,
          dependencies,
        ];
        this.rows.push(row);
      });
    });

  }


}
