import { Component, OnInit } from '@angular/core';
import { ProcessesHttpService } from '../services/processes-http.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  processes$ = this.processesService.getProcesses();

  constructor(
    private processesService: ProcessesHttpService,
  ) { }

  ngOnInit() {
  }

}
