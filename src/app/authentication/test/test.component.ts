import { Component, OnInit } from '@angular/core';

// import BpmnViewer from 'bpmn-js';

// import pizzaDiagram from './pizza-collaboration.bpmn';

// const viewer = new BpmnViewer({
//   container: '#canvas'
// });

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // viewer.importXML(pizzaDiagram).then(function(result) {

    //   const { warnings } = result;
    
    //   console.log('success !', warnings);
    
    //   viewer.get('canvas').zoom('fit-viewport');
    // }).catch(function(err) {
    
    //   const { warnings, message } = err;
    
    //   console.log('something went wrong:', warnings, message);
    // });
  }

}
