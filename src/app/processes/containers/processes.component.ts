import { Component, OnInit, } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DetailComponent } from './process/detail/detail.component';

import { ProcessesStoreService } from '../store/processes-store.service';
import { tap, filter, } from 'rxjs/operators';

import { CommonWithAnimationComponent } from 'src/app/shared/components/common-with-animation.component';

import * as fromSharedServices from '../../shared/services';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent extends CommonWithAnimationComponent implements OnInit {

  processes$ = this.processesStore.processes$
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
    private spinnerService: fromSharedServices.AppSpinnerService,
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
        this.processesStore.createProcess(result);
      }
    });
  }

}

