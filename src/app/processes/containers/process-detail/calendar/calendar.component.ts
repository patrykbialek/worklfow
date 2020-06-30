import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

import plLocale from '@fullcalendar/core/locales/pl';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import timeGridPlugin from '@fullcalendar/timegrid';
import resourceTimeGridPlugin from '@fullcalendar/resource-timegrid';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { ProcessesStoreService } from '@processes/store/processes-store.service';
import { tap, map } from 'rxjs/internal/operators';
import { Task } from '@processes/models';
import { EventInput } from '@fullcalendar/angular';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit {

  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      start: 'title', // will normally be on the left. if RTL, will be on the right
      end: 'dayGridMonth,timeGridWeek,timeGridDay today prev,next' // will normally be on the right. if RTL, will be on the left
    },
    initialView: 'dayGridMonth',
    locale: plLocale,
    weekends: true,
    editable: true,
    // selectable: true,
    // selectMirror: true,
    // dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],   // buttonIcons: {

    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  tasks$ = this.processesStore.process$
    .pipe(
      map((response: any) => response.tasks),
    )
    .subscribe((tasks: Task[]) => {
      const events: EventInput[] = [];
      tasks.forEach(task => {
        const event: EventInput = {
          id: task.key,
          title: task.name,
          start: task.startDate,
          end: task.endDate,
          allDay: true,
        };
        events.push(event);
      });
      this.calendarOptions.events = events;
      // console.log(this.calendarOptions.events)
    });

  @ViewChild('main') mainHTML: ElementRef;

  constructor(
    private processesStore: ProcessesStoreService,
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.mainHTML.nativeElement.style.opacity = '1';
    }, 100);
  }

  ngOnInit() {
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

}
