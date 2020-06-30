import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { ProcessesStoreService } from '@processes/store/processes-store.service';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


import * as moment from 'moment';
import { workingHours } from '@shared/services/app-config';

import * as fromModels from 'src/app/processes/models';
import { UsersHttpService } from '@shared/services';
import { BoardsHttpService } from '@processes/services/boards-http.service';

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent implements OnInit {

  selectedTask;
  taskForm: FormGroup;

  boards = [];
  boards$ = this.boardsService.getBoards().pipe(tap(response => this.boards = response));

  users = [];
  users$ = this.userService.users$.pipe(tap(response => this.users = response));

  constructor(
    public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private boardsService: BoardsHttpService,
    private formBuilder: FormBuilder,
    private processesStore: ProcessesStoreService,
    private userService: UsersHttpService,

  ) {
    this.selectedTask = data.task;
  }

  get assignee() { return this.taskForm.get('assignee'); }
  get board() { return this.taskForm.get('board'); }
  get description() { return this.taskForm.get('description'); }

  ngOnInit() {
    this.taskForm = this.formBuilder.group({
      assignee: [''],
      board: [''],
      description: [''],
      endDate: [''],
      name: [''],
      processes: [null],
      startDate: [''],
    });

    this.setListenerOnDescriptionChange();

    setTimeout(() => {
      const assignee = this.selectedTask.assignee ? this.users.find(user => user.key === this.selectedTask.assignee.key) : null;
      this.taskForm.get('assignee').setValue(assignee);
  
      const board = this.selectedTask.board ? this.boards.find(board => board.key === this.selectedTask.board.key) : null;
      this.taskForm.get('board').setValue(board);
  
      this.taskForm.get('name').setValue(this.selectedTask.name);
      this.taskForm.get('endDate').setValue(this.selectedTask.endDate);
      this.taskForm.get('startDate').setValue(this.selectedTask.startDate);
      this.taskForm.get('description').setValue(this.selectedTask.description, { emitEvent: false });
      
    },100);
  }

  onChangeAssignee() {
    let task = this.selectedTask;
    task.assignee = this.assignee.value;
    this.updateTask(task);
  }

  onChangeBoard() {
    let task = this.selectedTask;
    task.board = this.board.value;
    this.updateTask(task);
  }

  onChangeStartDate(event: MatDatepickerInputEvent<Date>) {
    let task = this.selectedTask;
    task.startDate = `${moment(event.value).format('YYYY-MM-DD')}T${workingHours.start}`;
    this.updateTask(task);
  }

  onChangeEndDate(event: MatDatepickerInputEvent<Date>) {
    let task = this.selectedTask;
    task.endDate = `${moment(event.value).format('YYYY-MM-DD')}T${workingHours.end}`;
    this.updateTask(task);
  }

  onToggleCompleted(task: fromModels.Task) {
    task.isCompleted = !task.isCompleted;
    this.updateTask(task);
  }

  updateDescription() {
    let task = this.selectedTask;
    task.description = this.description.value;
    this.updateTask(task);
  }

  private setListenerOnDescriptionChange() {
    this.description.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.updateDescription()),
      ).subscribe();
  }

  private updateTask(task: any) {
    const section = task.section.key;
    task = {
      ...task,
      section,
    };
    this.processesStore.updateTask(task.key, task);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
