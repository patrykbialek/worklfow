import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GanttChartComponent } from './gantt-chart/gantt-chart.component';
import { ServiceModule } from './service/service.module';

@NgModule({
  declarations: [GanttChartComponent],
  imports: [
    CommonModule,
    ServiceModule
  ],
  exports: [GanttChartComponent],
  providers : []
})
export class GoogleChartsModule { }