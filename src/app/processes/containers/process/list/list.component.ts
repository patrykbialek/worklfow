import { Component, OnInit } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  tasks$ = this.tasksHttpService.getAllTasksBySections();
  
  constructor(
    private tasksHttpService: TasksHttpService
  ) { }

  ngOnInit() {
  }

}
