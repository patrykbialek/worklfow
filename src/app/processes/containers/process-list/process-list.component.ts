import { Component, OnInit, } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { tap, filter, } from 'rxjs/operators';

import { DetailComponent } from '../process-detail/detail/detail.component';
import { CommonWithAnimationComponent } from '@shared/components/common-with-animation.component';

import { ProcessesStoreService } from '../../store/processes-store.service';
import * as fromSharedServices from '@shared/services';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProcessesFacadeService } from '@processes/store/services/processes-facade.service';

import * as fromStore from '../../store';

@Component({
  selector: 'app-process-list',
  templateUrl: './process-list.component.html',
  styleUrls: ['./process-list.component.scss']
})
export class ProcessListComponent extends CommonWithAnimationComponent implements OnInit {

  processes$ = this.processesService.processes$
    .pipe(
      filter(response => Boolean(response)),
      tap((response: any[]) => {
        if (response) {
          this.spinnerService.hide();
        }
      })
    );
    
  constructor(
    public dialog: MatDialog,
    private processesStore: ProcessesStoreService,
    private snackBar: MatSnackBar,
    private spinnerService: fromSharedServices.AppSpinnerService,

    private processesService: ProcessesFacadeService
  ) {
    super();
    this.processesStore.getProcesses();
    this.processesStore.getSections();
    this.processesStore.getTasks();
  }

  ngOnInit() {
    this.spinnerService.show();
  }

  onCreateProcess() {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '480px',
      disableClose: false,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.processesStore.createProcess(result);
        this.processesService.dispatch(new fromStore.CreateProcess(result));
        this.openSnackBar('Dane zapisane.', 'Zamknij');
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }

}

