// import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
// import {
//   ChartErrorEvent,
//   ChartMouseLeaveEvent,
//   ChartMouseOverEvent,
//   ChartSelectionChangedEvent,
//   ChartType,
//   Column,
//   GoogleChartComponent
// } from 'angular-google-charts';

// function daysToMilliseconds(days) {
//   return days * 24 * 60 * 60 * 1000;
// }

// @Component({
//   selector: 'app-timeline',
//   templateUrl: './timeline.component.html',
//   styleUrls: ['./timeline.component.scss']
// })
// export class TimelineComponent implements AfterViewInit, OnInit {

//   public chart: {
//     title: string;
//     type: ChartType;
//     data: any[][];
//     columns?: Column[];
//     options?: {};
//     formatters?: any;
//   };

//   @ViewChild('main') mainHTML: ElementRef;

//   constructor() { }

//   ngAfterViewInit() {
//     setTimeout(() => {
//       this.mainHTML.nativeElement.style.opacity = '1';
//     }, 100);
//   }

//   ngOnInit() {
//     this.chart = {
//       title: 'Gantt',
//       type: ChartType.Gantt,
//       columns: [],
//       data: null,
//       options: null,
//     };

//     this.chart.columns = [
//       { label: 'Task ID', type: 'string' },
//       { label: 'Task Name', type: 'string' },
//       { label: 'Resource', type: 'string' },
//       { label: 'Start', type: 'date' },
//       { label: 'End', type: 'date' },
//       { label: 'Duration', type: 'number' },
//       { label: 'Percent Complete', type: 'number' },
//       { label: 'Dependencies', type: 'string' },
//     ];

//     this.chart.data = [
//       // ['cit', ' Przygotować zestawienie CIT', 'Dział Rozliczeń CIT', new Date(2020, 5, 24), null, daysToMilliseconds(2), 20, null],
//       // ['kadry1', ' Przygotować listę płac', 'Dział Kadr', new Date(2020, 5, 24), null, daysToMilliseconds(2), 20, null],
//       // ['kadry2', ' Zamknąć rozliczenie', 'Dział Kadr', new Date(2020, 5, 26), null, daysToMilliseconds(2), 20, 'kadry1'],
//       ['design', 'Design', 'designer', new Date(2020, 5, 15), null, daysToMilliseconds(2), 75, null],
//       ['dev', 'Development', 'developer', null, null, daysToMilliseconds(1), 6, 'design'],
//       ['test', 'Testing', 'tester', null, null, daysToMilliseconds(2), 0, 'dev'],
//       ['deploy', 'Deployment', 'developer', null, null, daysToMilliseconds(2), 0, 'test'],
//       ['deploy1', 'Deployment1', 'developer2', null, null, daysToMilliseconds(2), 0, null],
//       ['deploy2', 'Deployment2', 'developer2', null, null, daysToMilliseconds(3), 0, null],
//       ['deploy3', 'Deployment3', 'developer2', null, null, daysToMilliseconds(1), 0, null],
//     ];

//     this.chart.options = {
//       height: this.chart.data.length * 50,
//       // width: 1400,
//       gantt: {
//         criticalPathEnabled: true, // Critical path arrows will be the same as other arrows.
//         arrow: {
//           angle: 20,
//           width: 1,
//           color: 'dodgerblue',
//           radius: 5
//         },
//         barHeight: 25,
//         labelStyle: {
//           // fontName: 'Roboto Mono',
//           fontSize: 12,
//           color: 'dodgerblue'
//         },
//         barCornerRadius: 2,
//         backgroundColor: {
//           fill: 'transparent',
//         },
//         innerGridHorizLine: {
//           stroke: '#ddd',
//           strokeWidth: 0,
//         },
//         innerGridTrack: {
//           fill: 'transparent'
//         },
//         innerGridDarkTrack: {
//           fill: 'transparent'
//         },
//         percentEnabled: true,
//         // percentStyle: {
//         //   fill:	'black',
//         // },
//         shadowEnabled: false,
//         defaultStartDate: new Date(2020, 5, 1),
//       },
//       axes: {
//         x: {
//           0: {side: 'top'} 
//         }
//       },
//       hAxis: {
//         title: 'Time of Day',
//         format: 'h:mm a',
//         viewWindow: {
//           min: [7, 30, 0],
//           max: [17, 30, 0]
//         }
//       },
//       explorer: { axis: 'horizontal' },
//       colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
//     };

//     // this.chart.formatters = [
//     //   {
//     //     formatter: new google.visualization.DateFormat({ formatType: 'long' }),
//     //     colIndex: 1
//     //   },
//     //   {
//     //     formatter: new google.visualization.DateFormat({ formatType: 'long' }),
//     //     colIndex: 3
//     //   }
//     // ];

//   }


// }
