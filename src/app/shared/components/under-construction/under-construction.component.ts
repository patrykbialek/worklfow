import { Component, AfterViewInit, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-under-construction',
  templateUrl: './under-construction.component.html',
  styleUrls: ['./under-construction.component.scss'],
})
export class UnderConstructionComponent implements AfterViewInit {

  @Input() size = 80;

  @ViewChild('imageHMTL') imageHMTL: ElementRef;

  ngAfterViewInit() {
    this.imageHMTL.nativeElement.style.height = `${this.size}px`;
    this.imageHMTL.nativeElement.style.width = `${this.size}px`;
  }
}
