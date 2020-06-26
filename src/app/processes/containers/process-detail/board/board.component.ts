import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

import * as fromModels from 'src/app/processes/models';
import * as fromAuthService from '@authentication/services';
import { ProcessesStoreService } from 'src/app/processes/store/processes-store.service';
import { UsersHttpService } from '@shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements AfterViewInit, OnInit {

  userId: string;

  tasks$ = this.processesStore.process$;
  processSections$ = this.processesStore.processSections$

  users$ = this.userService.users$;

  @ViewChild('main') mainHTML: ElementRef;

  constructor(
    private authService: fromAuthService.AuthService,
    private processesStore: ProcessesStoreService,
    private snackBar: MatSnackBar,
    private userService: UsersHttpService,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainHTML.nativeElement.style.opacity = '1';
    }, 100);
  }

  ngOnInit() {
    this.authService.user$
      .subscribe(response => this.userId = response.uid);
  }

  onChangeAssignee(request: any) {
    let task = request.task;
    task.assignee = request.user;
    this.updateTask(task);
  }

  onChangeIsCompleted(request: any) {
    request.task.isCompleted = request.isCompleted;
    this.updateTask(request.task);
  }

  addEventStartDate(event: MatDatepickerInputEvent<Date>, task: fromModels.Task) {
    task.startDate = event.value; //.toISOString();
    this.updateTask(task);
  }

  addEventEndDate(event: MatDatepickerInputEvent<Date>, task: fromModels.Task) {
    task.endDate = event.value; //.toISOString();
    this.updateTask(task);
  }

  updateTask(task: fromModels.Task) {
    const section = task.section.key;
    task = {
      ...task,
      section,
      userId: this.userId
    };
    this.processesStore.updateTask(task.key, task);
    this.openSnackBar('Dane zapisane.', 'Zamknij');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
