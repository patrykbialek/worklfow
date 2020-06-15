import { Component, OnInit } from '@angular/core';
import { TasksHttpService } from '../services/tasks-http.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  tasks$ = this.tasksService.getTasks();
  
  constructor(
    private tasksService: TasksHttpService,
  ) { }

  ngOnInit() {
  }

}
