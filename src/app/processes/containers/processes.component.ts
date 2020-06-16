import { Component, OnInit } from '@angular/core';
import { ProcessesHttpService } from '../services/processes-http.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './process/detail/detail.component';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  processes;

  constructor(
    public dialog: MatDialog,
    private processesService: ProcessesHttpService,
  ) { }

  ngOnInit() {
    this.processesService.getProcesses().subscribe(
      response => {
        this.processes = response;
      });
  }

  onCreateProcess() {
    const dialogRef = this.dialog.open(DetailComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
