import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { AngularMaterial } from '../angular-material.module';
import { TestComponent } from './test/test.component';


@NgModule({
  declarations: [LoginComponent, TestComponent],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    AngularMaterial,
    ReactiveFormsModule,
  ]
})
export class AuthenticationModule { }
