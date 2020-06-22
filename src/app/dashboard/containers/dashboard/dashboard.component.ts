import { Component, } from '@angular/core';

import { CommonWithAnimationComponent } from 'src/app/shared/components/common-with-animation.component';
import { AppSpinnerService } from '@shared/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends CommonWithAnimationComponent {
  constructor(
    private spinnerService: AppSpinnerService,
  ) {
    super();
    this.spinnerService.hide();
  }

}
