import { Component, OnInit } from '@angular/core';
import { AppSpinnerService } from 'src/app/shared/app-spinner/app-spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private spinnerService: AppSpinnerService,
  ) { }

  ngOnInit() {
    setTimeout(() => {
      this.spinnerService.hide();
    }, 300);
  }

}
