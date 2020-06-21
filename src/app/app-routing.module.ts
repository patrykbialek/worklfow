import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromAuthServices from '@authentication/services';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [fromAuthServices.AuthGuardService],
  },
  {
    path: 'processes',
    loadChildren: () => import('./processes/processes.module').then(m => m.ProcessesModule),
    canActivate: [fromAuthServices.AuthGuardService],
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule),
    canActivate: [fromAuthServices.AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
