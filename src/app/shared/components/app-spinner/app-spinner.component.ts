import { Component, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';

import { tap, } from 'rxjs/operators';

import { AppSpinnerService } from '../../services/app-spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './app-spinner.component.html',
  styleUrls: ['./app-spinner.component.scss'],
})
export class AppSpinnerComponent implements OnDestroy {

  isAnimated = false;

  interval1;
  interval2;

  timeout1;
  timeout2

  isShown$ = this.spinnerService.isShown$
    .pipe(
      tap((response) => {
        if (response) {
          this.setUpSpinnerElement();
        }
      }),
    );

  @Input() size: number;

  @ViewChild('imageHMTL') imageHMTL: ElementRef;

  constructor(
    private spinnerService: AppSpinnerService,
  ) { }

  ngOnDestroy() {
    clearInterval(this.interval1);
    clearInterval(this.interval2);
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
  }

  setUpSpinnerElement() {
    this.timeout1 = setTimeout(() => {
      if (this.imageHMTL) {
        this.imageHMTL.nativeElement.style.height = `${this.size}px`;
        this.imageHMTL.nativeElement.style.width = `${this.size}px`;

        this.timeout2 = setTimeout(() => {
          this.isAnimated = true;
        }, 100);

        this.interval1 = setInterval(() => {
          this.isAnimated = false;
        }, 4000);

        this.interval2 = setInterval(() => {
          this.isAnimated = true;
        }, 4100);
      }
    }, 300);
  }
}
