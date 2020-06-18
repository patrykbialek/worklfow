import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularMaterial } from '../angular-material.module';


@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    AngularMaterial,
    ReactiveFormsModule,
  ]
})
export class AuthenticationModule { }
