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
import { DetailComponent } from './containers/process/detail/detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { DiagramComponent } from './containers/process/diagram/diagram.component';


@NgModule({
  declarations: [
    ProcessesComponent,
    ListComponent,
    BoardComponent,
    TimelineComponent,
    CalendarComponent,
    ProcessComponent,
    DetailComponent,
    DiagramComponent,
  ],
  imports: [
    CommonModule,
    ProcessesRoutingModule,
    AngularMaterial,
    ReactiveFormsModule,

    SharedModule,

  ],
  exports: [
    DetailComponent,
  ]
})
export class ProcessesModule { }
