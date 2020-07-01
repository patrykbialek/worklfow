import { Component, OnInit, ViewChild, ElementRef, AfterContentInit, AfterViewInit, Input } from '@angular/core';
import { GoogleChartService } from '../service/google-chart.service';

function daysToMilliseconds(days) {
  return days * 24 * 60 * 60 * 1000;
}

@Component({
  selector: 'app-gantt-chart',
  templateUrl: './gantt-chart.component.html',
  styleUrls: ['./gantt-chart.component.scss']
})
export class GanttChartComponent implements AfterViewInit {

  private gLib: any;

  @Input() rows;
  @ViewChild('ganttChart') ganttChartHTML: ElementRef;

  constructor(
    private googleChartService: GoogleChartService
  ) { }

  ngAfterViewInit() {
    this.gLib = this.googleChartService.getGoogle();
    this.gLib.charts.load('current', { 'packages': ['corechart', 'table', 'gantt'], 'language': 'pl' });
    this.gLib.charts.setOnLoadCallback(this.drawChart.bind(this));
  }

  drawChart() {
    let chart = new this.gLib.visualization.Gantt(this.ganttChartHTML.nativeElement);
    let data = new this.gLib.visualization.DataTable();

    data.addColumn('string', 'Task ID');
    data.addColumn('string', 'Task Name');
    data.addColumn('string', 'Resource');
    data.addColumn('date', 'Start Date');
    data.addColumn('date', 'End Date');
    data.addColumn('number', 'Duration');
    data.addColumn('number', 'Percent Complete');
    data.addColumn('string', 'Dependencies');

    data.addRows(this.rows);

    let options = {
      height: (this.rows.length * 50) + 50,
      legend: 'left',
      gantt: {
        criticalPathEnabled: true, // Critical path arrows will be the same as other arrows.
        arrow: {
          angle: 20,
          width: 1,
          color: 'dodgerblue',
          radius: 5
        },
        barHeight: 25,
        labelStyle: {
          fontSize: 12,
          color: 'dodgerblue'
        },
        barCornerRadius: 2,
        backgroundColor: {
          fill: 'transparent',
        },
        innerGridHorizLine: {
          stroke: '#ddd',
          strokeWidth: 0,
        },
        innerGridTrack: {
          fill: 'transparent'
        },
        innerGridDarkTrack: {
          fill: 'transparent'
        },
        percentEnabled: false,
        shadowEnabled: false,
        defaultStartDate: new Date(2020, 5, 1),
      },
      hAxis: {
        format: 'dd/MM/yyyy',
      },
      explorer: { axis: 'horizontal' },
    };

    const test = this.ganttChartHTML.nativeElement;

    // this.gLib.visualization.events.addListener(chart, 'select', selectHandler);

    // function selectHandler() {
    //   var selection = chart.getSelection();
    //   var message = '';
    
    //   for (var i = 0; i < selection.length; i++) {
    //     var item = selection[i];
    //     if (item.row != null && item.column != null) {
    //       message += '{row:' + item.row + ',column:' + item.column + '}';
    //     } else if (item.row != null) {
    //       console.log(rows[item.row])
    //     } else if (item.column != null) {
    //       message += '{column:' + item.column + '}';
    //     }
    //   }
    //   if (message == '') {
    //     message = 'nothing';
    //   }
    //   // alert('You selected ' + message);
    // }

    // this.gLib.visualization.events.addOneTimeListener(chart, 'ready', function () {
    //   var observer = new MutationObserver(function (nodes) {
    //     Array.prototype.forEach.call(nodes, function (node) {
    //       if (node.addedNodes.length > 0) {
    //         Array.prototype.forEach.call(node.addedNodes, function (addedNode) {
    //           if ((addedNode.tagName === 'rect') && (addedNode.getAttribute('fill') === 'white')) {
    //             addedNode.setAttribute('fill', 'transparent');
    //             addedNode.setAttribute('stroke', 'transparent');
    //             Array.prototype.forEach.call(addedNode.parentNode.getElementsByTagName('text'), function (label) {
    //               label.setAttribute('fill', 'transparent');
    //             });
    //           }
    //         });
    //       }
    //     });
    //   });
    //   observer.observe(test, {
    //     childList: true,
    //     subtree: true
    //   });
    // });

    chart.draw(data, options);
  }

}