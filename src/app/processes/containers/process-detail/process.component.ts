import { Component, OnInit, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { ProcessesStoreService } from '../../store/processes-store.service';
import { tap } from 'rxjs/operators';
import { CommonWithAnimationComponent } from 'src/app/shared/components/common-with-animation.component';
import { ProcessFacadeService } from '@processes/store/services';

// Store
import * as fromProcessStore from '../../store';

@Component({
  selector: 'app-process',
  templateUrl: './process.component.html',
  styleUrls: ['./process.component.scss']
})
export class ProcessComponent extends CommonWithAnimationComponent implements OnInit {

  navLinks = [
    {
      label: 'Diagram',
      link: './diagram',
      index: 0
    },
    {
      label: 'Zadania',
      link: './tasks',
      index: 1
    },
    {
      label: 'Tablica',
      link: './board',
      index: 2
    },
    {
      label: 'Harmonogram',
      link: './timeline',
      index: 3
    },
    {
      label: 'Kalendarz',
      link: './calendar',
      index: 4
    },
  ];
  activeLinkIndex = -1;

  process$ = this.processService.process$;

  constructor(
    private activatedRoute: ActivatedRoute,
    private processService: ProcessFacadeService,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });

    this.activatedRoute.params
      .subscribe(params => {
        this.processService.dispatch(new fromProcessStore.LoadProcess(params.id));
      });
  }
}
