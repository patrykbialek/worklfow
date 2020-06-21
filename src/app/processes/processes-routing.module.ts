import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as fromContainers from './containers';

const routes: Routes = [
  {
    path: '',
    component: fromContainers.ProcessesComponent,
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
      },
      {
        path: 'tasks',
        component: fromContainers.TasksComponent,
      },
      {
        path: 'board',
        component: fromContainers.BoardComponent,
      },
      {
        path: 'timeline',
        component: fromContainers.TimelineComponent,
      },
      {
        path: 'calendar',
        component: fromContainers.CalendarComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
