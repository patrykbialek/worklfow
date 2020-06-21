import { Component, } from '@angular/core';


import { CommonWithAnimationComponent } from '@shared/components/common-with-animation.component';
import * as fromServices from '../../services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent extends CommonWithAnimationComponent {

  tasks$ = this.tasksService.getAllTasks();

  constructor(
    private tasksService: fromServices.TasksHttpService,
  ) { super(); }


}
