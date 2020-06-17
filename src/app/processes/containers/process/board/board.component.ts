import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as fromModels from 'src/app/processes/models';
import { ProcessesStoreService } from 'src/app/processes/store/processes-store.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tasks$ = this.processesStore.process$;
  processSections$ = this.processesStore.processSections$

  constructor(
    private processesStore: ProcessesStoreService,
  ) {}

  ngOnInit() {
  }

  onChangeAssignee(request: any) {
    request.task.assignee = request.assignee;
    this.updateTask(request.task);
  }

  onChangeIsCompleted(request: any) {
    request.task.isCompleted = request.isCompleted;
    this.updateTask(request.task);
  }

  addEvent(event: MatDatepickerInputEvent<Date>, task: fromModels.Task) {
    task.endDate = event.value.toISOString();
    this.updateTask(task);
  }

  updateTask(task: fromModels.Task) {
    const section = task.section.key;
    task = {
      ...task,
      section,
    };
    this.processesStore.updateTask(task.key, task);
  }
}
