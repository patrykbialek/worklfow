import { Component, OnInit, HostListener } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';
import { Task, Process } from 'src/app/processes/models';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProcessesStoreService } from 'src/app/processes/services/processes-store.service';

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
    private processesStore: ProcessesStoreService,
  ) { 
    this.processesStore.getTasksBySection();
  }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    this.onHideTaskDetail();
  }

  ngOnInit() {
    this.processesStore.processSections$
      .pipe(
        tap(response => this.dataSourceTasksBySections = response)
      ).subscribe();

    this.allTasks$ = this.tasksHttpService.getAllTasks()
      .pipe(
        tap((response: any) => this.dataSourceAllTasks = response),
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
    const section = task.section.key;
    task = {
      ...task,
      section,
    };
    this.updateTask(task);
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

  updateTask(task: any) {
    this.processesStore.updateTask(task.key, task);
  }

}
