import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular'; // the main connector. must go first
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction'; // a plugin

import { ProcessesRoutingModule } from './processes-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromContainers from './containers';

import { GoogleChartsModule } from '@shared/google-charts/google-charts.module';
import { TaskDetailDialogComponent } from './containers/process-detail/task-detail-dialog/task-detail-dialog.component';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

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

  ],
  providers: [
  ],
  exports: [
    ...fromContainers.components,
  ]
})
export class ProcessesModule { }
