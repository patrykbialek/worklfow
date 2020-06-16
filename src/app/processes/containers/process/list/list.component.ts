import { Component, OnInit, HostListener } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';
import { Task, Process } from 'src/app/processes/models';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';

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

  isDrawerOpen: boolean;
  selectedTask: Task;

  taskForm: FormGroup;

  processList: Process[] = [
    {
      id: '3434er34234',
      name: 'Zamknięcie miesiąca kwiecień 2020',
      startDate: null,
      endDate: null,
      team: null,
      description: null,
    },
    {
      id: 'err343434',
      name: 'Zamknięcie miesiąca maj 2020',
      startDate: null,
      endDate: null,
      team: null,
      description: null,
    },
  ]

  constructor(
    private formBuilder: FormBuilder,
    private tasksHttpService: TasksHttpService,
  ) { }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    this.onHideTaskDetail();
  }

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

    this.taskForm = this.formBuilder.group({
      name: [''],
      assignee: [''],
      endDate: [''],
      description: [''],
      processes: [null],
    });
  }

  onToggleCompleted(task: Task) {
    task.isCompleted = !task.isCompleted;
  }

  onDisplayTaskDetail(task: Task) {
    this.selectedTask = task;
    this.isDrawerOpen = true;

    if (this.selectedTask) {
      this.taskForm.get('name').setValue(this.selectedTask.name);
      this.taskForm.get('assignee').setValue(this.selectedTask.assignee);
      this.taskForm.get('endDate').setValue(this.selectedTask.endDate);
      this.taskForm.get('description').setValue(this.selectedTask.description);
    }
  }

  onHideTaskDetail() {
    this.selectedTask = null;
    this.isDrawerOpen = false;
  }

  onSaveTaskDetail() {
    this.selectedTask = null;
    this.isDrawerOpen = false;
  }

}
