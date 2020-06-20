import { NgModule } from '@angular/core';
import { UnderConstructionComponent } from './under-construction/under-construction.component';
import { CommonModule } from '@angular/common';
import { AppSpinnerComponent } from './app-spinner/app-spinner.component';
import { CommonWithAnimationComponent } from './common-with-animation.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    AppSpinnerComponent,
    CommonWithAnimationComponent,
    UnderConstructionComponent,
  ],
  exports: [
    AppSpinnerComponent,
    CommonWithAnimationComponent,
    UnderConstructionComponent
  ],
})
export class SharedModule { }
