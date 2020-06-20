import { Component, OnInit, } from '@angular/core';
import { AppSpinnerService } from 'src/app/shared/app-spinner/app-spinner.service';
import { CommonWithAnimationComponent } from 'src/app/shared/common-with-animation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends CommonWithAnimationComponent implements OnInit {

  constructor(
    private spinnerService: AppSpinnerService,
  ) { super(); }

  ngOnInit() {
    setTimeout(() => {
      this.spinnerService.hide();
    }, 300);
  }

}
