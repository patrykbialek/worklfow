import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';
import * as fromSharedServices from '@shared/services';

const appTitle = 'work_smarter';
const processTitle = 'Mój proces';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProcessesComponent,
    data: { title: `Moje procesy | ${appTitle}` },
    resolve: { title: fromSharedServices.TitleResolverService },
  },
  {
    path: ':id',
    redirectTo: ':id/diagram',
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: fromContainers.ProcessComponent,
    children: [
      {
        path: 'diagram',
        component: fromContainers.DiagramComponent,
        data: { title: `${processTitle} - diagram | ${appTitle}` },
        resolve: { title: fromSharedServices.TitleResolverService },
      },
      {
        path: 'tasks',
        component: fromContainers.TasksComponent,
        data: { title: `${processTitle} - zadania | ${appTitle}` },
        resolve: { title: fromSharedServices.TitleResolverService },
      },
      {
        path: 'board',
        component: fromContainers.BoardComponent,
        data: { title: `${processTitle} - tablica | ${appTitle}` },
        resolve: { title: fromSharedServices.TitleResolverService },
      },
      {
        path: 'timeline',
        component: fromContainers.TimelineComponent,
        data: { title: `${processTitle} - harmonogram | ${appTitle}` },
        resolve: { title: fromSharedServices.TitleResolverService },
      },
      {
        path: 'calendar',
        component: fromContainers.CalendarComponent,
        data: { title: `${processTitle} - kalendarz | ${appTitle}` },
        resolve: { title: fromSharedServices.TitleResolverService },
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
