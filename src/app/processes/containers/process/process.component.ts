import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProcessesHttpService } from '../../services/processes-http.service';
import { ProcessesStoreService } from '../../services/processes-store.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent implements OnInit {

  navLinks = [
    {
      label: 'Zadania',
      link: './list',
      index: 0
    },
    {
      label: 'Tablica',
      link: './board',
      index: 1
    },
    {
      label: 'Harmonogram',
      link: './timeline',
      index: 2
    },
    {
      label: 'Kalendarz',
      link: './calendar',
      index: 3
    },
  ];
  activeLinkIndex = -1;

  process$ = this.processesService.process$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private processesService: ProcessesStoreService,
    private processesHttpService: ProcessesHttpService,
  ) { }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.activatedRoute.params
      .subscribe(params => {
        this.processesService.getProcess(params.id);
      });
  }
}
