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

  tasks$ = this.processesStoreService.process$;
  
  constructor(
    private processesStoreService: ProcessesStoreService,
  ) { }

  ngOnInit() {
  }

  onSetAsCompleted(task: Task) {
    task.isCompleted = true;
  }
  onSetAsUncompleted(task: Task) {
    task.isCompleted = false;
  }
  onChangeAssignee(assignee: string, task: Task) {
    task.assignee = assignee;
  }
  addEvent(event: MatDatepickerInputEvent<Date>, task: Task) {
    task.endDate = event.value.toISOString();
  }

}
