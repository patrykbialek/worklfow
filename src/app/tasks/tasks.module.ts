import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TasksRoutingModule } from './tasks-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromContainers from './containers';

@NgModule({
  declarations: [
    ...fromContainers.components,
  ],
  imports: [
    CommonModule,
    TasksRoutingModule,

    SharedModule,

  ]
})
export class TasksModule { }
