import { Component, OnInit } from '@angular/core';
import { ProcessesHttpService } from '../services/processes-http.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  processes;

  constructor(
    private processesService: ProcessesHttpService,
  ) { }

  ngOnInit() {
    this.processesService.getProcesses().subscribe(
      response => {
        this.processes = response;
      });
  }

}
