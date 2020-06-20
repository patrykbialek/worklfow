import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AppSpinnerService } from 'src/app/shared/app-spinner/app-spinner.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit, OnInit {

  @ViewChild('main') mainHTML: ElementRef;
  
  constructor(
    private spinnerService: AppSpinnerService,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainHTML.nativeElement.style.opacity = '1';
    }, 100);
  }

  ngOnInit() {
    setTimeout(() => {
      this.spinnerService.hide();
    }, 300);
  }

}
