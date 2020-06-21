import { Component, } from '@angular/core';

import { CommonWithAnimationComponent } from 'src/app/shared/components/common-with-animation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends CommonWithAnimationComponent {
  constructor() { super(); }

}
