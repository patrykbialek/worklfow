import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcessesRoutingModule } from './processes-routing.module';
import { ProcessesComponent } from './containers/processes.component';
import { ListComponent } from './containers/process/list/list.component';
import { BoardComponent } from './containers/process/board/board.component';
import { TimelineComponent } from './containers/process/timeline/timeline.component';
import { CalendarComponent } from './containers/process/calendar/calendar.component';
import { ProcessComponent } from './containers/process/process.component';
import { AngularMaterial } from '../angular-material.module';


@NgModule({
  declarations: [
    ProcessesComponent,
    ListComponent,
    BoardComponent,
    TimelineComponent,
    CalendarComponent,
    ProcessComponent,
  ],
  imports: [
    CommonModule,
    ProcessesRoutingModule,
    AngularMaterial,

  ]
})
export class ProcessesModule { }
