import { Component, OnInit } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';
import { Task } from 'src/app/processes/models';
import { TasksComponent } from 'src/app/tasks/containers/tasks.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ProcessesStoreService } from 'src/app/processes/services/processes-store.service';

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
  ) { }

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

  addEvent(event: MatDatepickerInputEvent<Date>, task: Task) {
    task.endDate = event.value.toISOString();
    this.updateTask(task);
  }

  updateTask(task: Task) {
    const section = task.section.key;
    task = {
      ...task,
      section,
    };
    this.processesStore.updateTask(task.key, task);
  }
}
