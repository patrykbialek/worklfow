import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';

import { ProcessesRoutingModule } from './processes-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromContainers from './containers';
import { DateAdapter, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';
import { MAT_MOMENT_DATE_FORMATS, MomentDateAdapter } from '@angular/material-moment-adapter';
import * as _moment from 'moment';

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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    ProcessesRoutingModule,
    SharedModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  exports: [
    ...fromContainers.components,
  ]
})
export class ProcessesModule { }
