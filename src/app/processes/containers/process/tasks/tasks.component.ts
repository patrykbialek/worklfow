import { Component, OnInit, HostListener } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';
import { MatTableDataSource } from '@angular/material/table';
import { tap } from 'rxjs/operators';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProcessesStoreService } from 'src/app/processes/store/processes-store.service';
import { Observable } from 'rxjs';

import * as fromModels from 'src/app/processes/models';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {

  displayedColumns: string[] = ['index', 'name', 'assignee', 'endDate', 'priority'];
  dataSourceAllTasks: fromModels.Task[] = [];
  dataSourceTasksBySections: any[] = [];

  isDrawerOpen: boolean;
  selectedTask: fromModels.Task;

  taskForm: FormGroup;

  allTasks$: Observable<fromModels.Task[]> = this.tasksHttpService.getAllTasks();
  processSections$: Observable<fromModels.Section[]> = this.processesStore.processSections$;

  constructor(
    private formBuilder: FormBuilder,
    private tasksHttpService: TasksHttpService,
    private processesStore: ProcessesStoreService,
  ) {}

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    this.onHideTaskDetail();
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: [''],
      assignee: [''],
      endDate: [''],
      description: [''],
      processes: [null],
    });
  }

  onToggleCompleted(task: fromModels.Task) {
    task.isCompleted = !task.isCompleted;
    const section = task.section.key;
    task = {
      ...task,
      section,
    };
    this.updateTask(task);
  }

  onDisplayTaskDetail(task: fromModels.Task) {
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
