import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthenticationComponent } from './containers/authentication.component';
import * as fromContainers from '@authentication/containers';
import * as fromSharedServices from '@shared/services';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthenticationComponent,
    children: [
      {
        path: 'login',
        component: fromContainers.LoginComponent,
        data: { title: 'Witamy | work_smarter' },
        resolve: { title: fromSharedServices.TitleResolverService },
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }
