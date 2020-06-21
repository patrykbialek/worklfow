import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './modules/angular-material.module';

import * as fromComponents from './components';

@NgModule({
  imports: [
    CommonModule,

    AngularMaterialModule,
  ],
  declarations: [
    ...fromComponents.components,
  ],
  exports: [
    AngularMaterialModule,
    
    ...fromComponents.components,
  ],
})
export class SharedModule { }
