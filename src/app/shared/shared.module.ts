import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngularMaterialModule } from './modules/angular-material.module';

import * as fromComponents from './components';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects } from './store';

@NgModule({
  imports: [
    CommonModule,

    AngularMaterialModule,

    StoreModule.forFeature('main', reducers),
    EffectsModule.forFeature(effects),
    
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
