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
import { workingHours } from '@shared/services/app-config';
import { TaskDetailDialogComponent } from '../task-detail-dialog/task-detail-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements AfterViewInit, OnInit {

  tasks = [];
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      start: 'title', // will normally be on the left. if RTL, will be on the right
      end: 'today prev,next' // will normally be on the right. if RTL, will be on the left
    },
    initialView: 'dayGridMonth',
    locale: plLocale,
    weekends: true,
    editable: true,
    selectable: true,
    // selectMirror: true,
    // dayMaxEvents: true,
    // select: this.handleDateSelect.bind(this),
    // eventsSet: this.handleEvents.bind(this),
    eventClick: this.openDialog.bind(this),
    eventDrop: this.updateTaskOnDrop.bind(this),
    eventResize: this.test.bind(this),
    plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],   // buttonIcons: {
    timeZone: 'local',
    nextDayThreshold: `${workingHours.start}`,
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  test(event: any) {
    // console.log(event);
  }

  tasks$ = this.processesStore.process$
    .pipe(
      map((response: any) => response.tasks),
    )
    .subscribe((tasks: Task[]) => {
      this.tasks = tasks;
      const events: EventInput[] = [];
      tasks.forEach(task => {
        const event: EventInput = {
          id: task.key,
          title: task.name,
          start: task.startDate,
          end: task.endDate,
          extendedProps: task,
          // allDay: true,
          // backgroundColor: '#424242',
        };
        events.push(event);
      });
      this.calendarOptions.events = events;
    });

  @ViewChild('main') mainHTML: ElementRef;

  constructor(
    public dialog: MatDialog,
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

  handleEventClick(event: EventClickArg) {
    // code here
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  openDialog(data: any): void {
    const task = this.tasks.find(task => task.key === data.event.id);
    const dialogRef = this.dialog.open(TaskDetailDialogComponent, {
      width: '600px',
      data: {
        task
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      // this.animal = result;
    });
  }

  updateTaskOnDrop(info: any) {
    let task: Task = { ...info.event.extendedProps };
    task.startDate = info.event.start;
    task.endDate = info.event.end;
    const section = task.section.key ? task.section.key : task.section;
    task = {
      ...task,
      section,
    };
    this.processesStore.updateTask(task.key, task);
  }

}
