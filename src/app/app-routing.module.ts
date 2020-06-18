import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';


const routes: Routes = [
  // {
  //   path: 'login',
  //   loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)
  // },
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'processes',
    loadChildren: () => import('./processes/processes.module').then(m => m.ProcessesModule)
  },
  {
    path: 'tasks',
    loadChildren: () => import('./tasks/tasks.module').then(m => m.TasksModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
