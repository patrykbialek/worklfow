import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DetailComponent } from './process/detail/detail.component';

import { ProcessesStoreService } from '../store/processes-store.service';
import { tap, filter, finalize } from 'rxjs/operators';
import { AppSpinnerService } from 'src/app/shared/app-spinner/app-spinner.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

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
    private spinnerService: AppSpinnerService,
  ) {
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

