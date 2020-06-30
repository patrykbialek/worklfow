import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BoardsHttpService } from '@processes/services/boards-http.service';
import { ProcessesStoreService } from '@processes/store/processes-store.service';
import { UsersHttpService } from '@shared/services';
import { workingHours } from '@shared/services/app-config';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import * as fromModels from 'src/app/processes/models';

@Component({
  selector: 'app-task-detail-dialog',
  templateUrl: './task-detail-dialog.component.html',
  styleUrls: ['./task-detail-dialog.component.scss']
})
export class TaskDetailDialogComponent implements OnDestroy, OnInit {

  task: fromModels.Task;
  taskForm: FormGroup;

  boards$ = this.boardsService.getBoards()
    .pipe(
      tap((boards: fromModels.Board[]) => this.fillFormWithBoardData(boards)),
    );

  users$ = this.userService.users$
    .pipe(
      tap(users => this.fillFormWithAssigneeData(users)),
    );

  private subscription$ = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<TaskDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private boardsService: BoardsHttpService,
    private formBuilder: FormBuilder,
    private processesStore: ProcessesStoreService,
    private userService: UsersHttpService,
  ) {
    this.task = data.task;
  }

  get assignee() { return this.taskForm.get('assignee'); }
  get board() { return this.taskForm.get('board'); }
  get description() { return this.taskForm.get('description'); }
  get endDate() { return this.taskForm.get('endDate'); }
  get startDate() { return this.taskForm.get('startDate'); }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

  ngOnInit() {
    this.createForm();
    this.fillFormData();

    this.setListenerOnDescriptionChange();
    this.setListenerOnFormChange();
  }

  //#region OnChange

  onToggleCompleted() { this.task.isCompleted = !this.task.isCompleted; }

  updateDescription() { this.task.description = this.description.value; }

  //#endregion

  private createForm() {
    this.taskForm = this.formBuilder.group({
      assignee: [''],
      board: [''],
      description: [''],
      endDate: [''],
      name: [''],
      processes: [null],
      startDate: [''],
    });
  }

  private fillFormData() {
    this.taskForm.get('description').setValue(this.task.description, { emitEvent: false });
    this.taskForm.get('endDate').setValue(this.task.endDate, { emitEvent: false });
    this.taskForm.get('name').setValue(this.task.name, { emitEvent: false });
    this.taskForm.get('startDate').setValue(this.task.startDate, { emitEvent: false });
  }

  private fillFormWithBoardData(boards: any[]) {
    const board = this.task.board ? boards.find(board => board.key === this.task.board.key) : null;
    this.taskForm.get('board').setValue(board, { emitEvent: false });
  }

  private fillFormWithAssigneeData(users: any[]) {
    const assignee = this.task.assignee ? users.find(user => user.key === this.task.assignee.key) : null;
    this.taskForm.get('assignee').setValue(assignee, { emitEvent: false });
  }

  private setListenerOnDescriptionChange() {
    this.subscription$.add(this.description.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        tap(() => this.updateDescription()),
      ).subscribe());
  }

  private setListenerOnFormChange() {
    this.subscription$.add(this.taskForm.valueChanges.pipe(
      debounceTime(550),
      distinctUntilChanged(),
    ).subscribe(() => this.updateTask()));
  }

  private updateTask() {
    this.task.assignee = this.assignee.value;
    this.task.board = this.board.value;

    this.task.endDate = `${moment(this.endDate.value).format('YYYY-MM-DD')}T${workingHours.start}`;
    this.task.startDate = `${moment(this.startDate.value).format('YYYY-MM-DD')}T${workingHours.start}`;

    const section = this.task.section.key ? this.task.section.key : this.task.section;
    this.task = {
      ...this.task,
      section,
    };
    this.processesStore.updateTask(this.task.key, this.task);
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
