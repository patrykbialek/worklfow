import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterial } from './angular-material.module';
import { environment } from 'src/environments/environment';
import { AuthenticationModule } from './authentication/authentication.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,

    AngularMaterial,
    
    AngularFireModule.initializeApp(environment.firebase, 'workflow'),
    AngularFireDatabaseModule,
    AngularFireAuthModule,

    AuthenticationModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
