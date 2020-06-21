import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromSharedServices from '@shared/services';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.DashboardComponent,
    data: { title: 'Dashboard | work_smarter' },
    resolve: { title: fromSharedServices.TitleResolverService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
