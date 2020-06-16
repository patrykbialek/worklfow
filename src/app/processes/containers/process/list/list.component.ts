import { Component, OnInit } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';
import { Task } from 'src/app/processes/models';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  allTasks$;
  tasksBySections$;

  displayedColumns: string[] = ['index', 'name', 'assignee', 'endDate', 'priority'];
  dataSourceAllTasks: Task[] = [];
  dataSourceTasksBySections: any[] = [];

  constructor(
    private tasksHttpService: TasksHttpService,
  ) { }

  ngOnInit() {
    this.allTasks$ = this.tasksHttpService.getAllTasks()
      .pipe(
        tap(response => this.dataSourceAllTasks = response),
      ).subscribe();

    this.tasksBySections$ = this.tasksHttpService.getAllTasksBySections()
      .pipe(
        tap(console.log),
        tap(response => this.dataSourceTasksBySections = response),
      ).subscribe();
  }

  onSetAsCompleted(task: Task) {
    task.isCompleted = true;
  }

}
