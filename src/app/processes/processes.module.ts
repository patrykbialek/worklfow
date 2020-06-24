import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ProcessesRoutingModule } from './processes-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromContainers from './containers';

import { GoogleChartsModule } from '@shared/google-charts/google-charts.module';

@NgModule({
  declarations: [
    ...fromContainers.components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ProcessesRoutingModule,
    SharedModule,

    GoogleChartsModule,
  ],
  providers: [
  ],
  exports: [
    ...fromContainers.components,
  ]
})
export class ProcessesModule { }
