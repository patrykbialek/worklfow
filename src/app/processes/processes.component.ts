import { Component, } from '@angular/core';
import { ProcessesFacadeService } from './store/services/processes-facade.service';

import * as fromStore from './store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-processes',
  template: '<router-outlet></router-outlet>'
})
export class ProcessesComponent {

  constructor(
    private processesService: ProcessesFacadeService,
  ) {
    this.processesService.dispatch(new fromStore.LoadProcesses());
  }
}

