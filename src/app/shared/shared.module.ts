import { NgModule } from '@angular/core';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { CommonModule } from '@angular/common';
import { AppSpinnerComponent } from './app-spinner/app-spinner.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AppSpinnerComponent,
    UnderConstructionComponent,
  ],
  exports: [
    AppSpinnerComponent,
    UnderConstructionComponent
  ],
})
export class SharedModule { }
