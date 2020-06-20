import { Component, } from '@angular/core';
import { CommonWithAnimationComponent } from 'src/app/shared/common-with-animation.component';

import { TasksHttpService } from '../services/tasks-http.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent extends CommonWithAnimationComponent {

  tasks$ = this.tasksService.getAllTasks();

  constructor(
    private tasksService: TasksHttpService,
  ) { super(); }


}
