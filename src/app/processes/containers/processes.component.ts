import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { DetailComponent } from './process/detail/detail.component';

import { ProcessesStoreService } from '../store/processes-store.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  processes$ = this.processesStore.processes$;

  constructor(
    public dialog: MatDialog,
    private processesStore: ProcessesStoreService,
  ) {
    this.processesStore.getProcesses();
    this.processesStore.getSections();
    this.processesStore.getTasks();
  }

  ngOnInit() {
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

