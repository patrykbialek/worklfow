import { Component, OnInit } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';
import { Task } from 'src/app/processes/models';
import { TasksComponent } from 'src/app/tasks/containers/tasks.component';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  tasks$ = this.tasksHttpService.getAllTasksBySections();
  
  constructor(
    private tasksHttpService: TasksHttpService,
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
    // this.events.push(`${type}: ${event.value}`);
    console.log(event)
    task.endDate = event.value.toISOString();
  }

}
