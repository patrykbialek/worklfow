import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import { CalendarOptions } from '@fullcalendar/angular'; // useful for typechecking

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit {

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth'
  };

  @ViewChild('main') mainHTML: ElementRef;

  constructor() { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainHTML.nativeElement.style.opacity = '1';
    }, 100);
  }

  ngOnInit() {
  }

}
