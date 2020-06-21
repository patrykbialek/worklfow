import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TasksHttpService } from 'src/app/tasks/services/tasks-http.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ProcessesStoreService } from 'src/app/processes/store/processes-store.service';
import { Observable } from 'rxjs';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as fromModels from 'src/app/processes/models';
import { UsersHttpService } from '@shared/services';
import { MatSelectChange } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
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

  users = [];
  users$ = this.userService.users$;

  @ViewChild('main') mainHTML: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private processesStore: ProcessesStoreService,
    private snackBar: MatSnackBar,
    private tasksHttpService: TasksHttpService,
    private userService: UsersHttpService,
  ) { }

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownHandler(evt: KeyboardEvent) {
    this.onHideTaskDetail();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainHTML.nativeElement.style.opacity = '1';
    }, 100);
  }

  get assignee() {
    return this.taskForm.get('assignee');
  }

  get description() {
    return this.taskForm.get('description');
  }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      name: [''],
      assignee: [''],
      endDate: [''],
      description: [''],
      processes: [null],
    });

    this.users$.subscribe(response => this.users = response);
  }

  onChangeAssignee(event: MatSelectChange) {
    let task = this.selectedTask;
    task.assignee = this.assignee.value;
    this.updateTask(task);
  }

  onToggleCompleted(task: fromModels.Task) {
    task.isCompleted = !task.isCompleted;
    this.updateTask(task);
  }

  onDisplayTaskDetail(task: fromModels.Task) {
    this.selectedTask = task;
    this.isDrawerOpen = true;
    
    if (this.selectedTask) {
      const assignee = task.assignee ? this.users.find(user => user.key === task.assignee.key) : null;

      this.taskForm.get('name').setValue(this.selectedTask.name);
      this.taskForm.get('assignee').setValue(assignee);
      this.taskForm.get('endDate').setValue(this.selectedTask.endDate);
      this.taskForm.get('description').setValue(this.selectedTask.description);
    }
  }

  onHideTaskDetail() {
    this.selectedTask = null;
    this.isDrawerOpen = false;
  }

  onSaveTaskDetail() {
    if (this.taskForm.valid) {
      let task = this.selectedTask;
      task.description = this.description.value;
      this.updateTask(task);
      this.selectedTask = null;
      this.isDrawerOpen = false;
    }
  }

  updateTask(task: any) {
    const section = task.section.key;
    task = {
      ...task,
      section,
    };
    this.processesStore.updateTask(task.key, task);
    this.openSnackBar('Dane zapisane.', 'Zamknij');
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {
    let task = this.selectedTask;
    task.endDate = event.value.toISOString();
    this.updateTask(task);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
