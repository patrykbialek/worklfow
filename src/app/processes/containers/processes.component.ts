import { Component, OnInit } from '@angular/core';
import { ProcessesHttpService } from '../services/processes-http.service';
import { MatDialog } from '@angular/material/dialog';
import { DetailComponent } from './process/detail/detail.component';
import { tap, filter, map } from 'rxjs/operators';
import { ProcessesStoreService } from '../services/processes-store.service';

@Component({
  selector: 'app-processes',
  templateUrl: './processes.component.html',
  styleUrls: ['./processes.component.scss']
})
export class ProcessesComponent implements OnInit {

  processes$ = this.processesStore.processes$;

  constructor(
    public dialog: MatDialog,
    private processesService: ProcessesHttpService,
    private processesStore: ProcessesStoreService,
  ) {
    this.processesStore.getProcesses();
    this.processesStore.getTasks();
    this.processesStore.getSections();
  }

  ngOnInit() {
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

  onCreateSection() {
    const today = new Date();
    const section = {
      name: 'Dział Rozliczeń CIT',
      created: today.toISOString(),
    };
    this.processesService.createSection(section);
  }

  onCreateTask() {
    const today = new Date();
    const task = {
      assignee: null,
      created: today.toISOString(),
      description: null,
      endDate: null,
      isCompleted: false,
      name: 'Przygotować zestawienie CIT',
      priority: 'high',
      section: 'test',
      startDate: today.toISOString(),
      subtasks: [],
    };
    this.processesService.createTask(task);
  }

  onCreateProcessTemplate() {
    const today = new Date();
    const template = {
      created: today.toISOString(),
      description: null,
      name: 'Zamknięcie miesiąca księgowego (duzy podmiot)',
      tasks: [
        "-MA065JvwpIW5VtKaqUi",
        "-MA06D-XosET8g_rlQVs",
        "-MA06DAqIWKvvzcYzwLr",
        "-MA06DKNpdi1kUpUuczg",
        "-MA06DSmjMX_rnOkiNav"
      ],
      team: null,
    };
    this.processesService.createTemplate(template);
  }

}

