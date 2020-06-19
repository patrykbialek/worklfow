import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessesComponent } from './containers/processes.component';
import { ProcessComponent } from './containers/process/process.component';
import { TasksComponent } from './containers/process/tasks/tasks.component';
import { BoardComponent } from './containers/process/board/board.component';
import { TimelineComponent } from './containers/process/timeline/timeline.component';
import { CalendarComponent } from './containers/process/calendar/calendar.component';
import { DiagramComponent } from './containers/process/diagram/diagram.component';


const routes: Routes = [
  {
    path: '',
    component: ProcessesComponent,
  },
  {
    path: ':id',
    redirectTo: ':id/diagram',
    pathMatch: 'full'
  },
  {
    path: ':id',
    component: ProcessComponent,
    children: [
      {
        path: 'diagram',
        component: DiagramComponent,
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'board',
        component: BoardComponent,
      },
      {
        path: 'timeline',
        component: TimelineComponent,
      },
      {
        path: 'calendar',
        component: CalendarComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessesRoutingModule { }
