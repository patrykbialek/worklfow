import { Component, OnInit } from '@angular/core';
import { ProcessesHttpService } from '../services/processes-http.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './process/detail/detail.component';
import { tap, filter, map } from 'rxjs/operators';

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

    this.processesService
      .getProcesses()
      .pipe(
        filter(response => Boolean(response)),
        map((response: any) => {
          return response.map(item => {
            let tasksAllCount = 0;
            let taskCompletedCount = 0;
            item.sections.map(section => {
              tasksAllCount += section.tasks.length;
              section.tasks.map(task => {
                if (task.isCompleted) {
                  taskCompletedCount += 1;
                }
              });
            })
            return {
              ...item,
              progress: taskCompletedCount / tasksAllCount * 100,
            };
          })
        })
      ).subscribe(response => {
        this.processes = response;
      });
  }

  onCreateProcess() {
    const dialogRef = this.dialog.open(DetailComponent, {
      width: '480px',
      disableClose: false,
      data: {
        text: 'Dane na stronie <b>kaft.pl</b> zostaną zaktualizowane.'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.processesService.createProcess(result);
      }
    });
  }

}
