import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

import { ProcessesRoutingModule } from './processes-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromContainers from './containers';

import { GoogleChartsModule } from '@shared/google-charts/google-charts.module';
import { TaskDetailDialogComponent } from './containers/process-detail/task-detail-dialog/task-detail-dialog.component';
import { StoreModule } from '@ngrx/store';

import { reducers, effects } from './store';
import { EffectsModule } from '@ngrx/effects';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL'
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY'
  }
};

@NgModule({
  declarations: [
    ...fromContainers.components,
    TaskDetailDialogComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ProcessesRoutingModule,
    SharedModule,

    GoogleChartsModule,

    FullCalendarModule, // register FullCalendar with you app

    StoreModule.forFeature('processes', reducers),
    EffectsModule.forFeature(effects),

  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
  exports: [
    ...fromContainers.components,
  ]
})
export class ProcessesModule { }
