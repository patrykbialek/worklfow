import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { SharedModule } from '@shared/shared.module';

import * as fromContainers from './containers';

@NgModule({
  declarations: [
    ...fromContainers.components,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    
    AuthenticationRoutingModule,
    SharedModule,
  ]
})
export class AuthenticationModule { }
