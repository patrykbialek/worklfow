import {
  AfterContentInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewChild,
  OnInit
} from '@angular/core';

/**
 * You may include a different variant of BpmnJS:
 *
 * bpmn-viewer  - displays BPMN diagrams without the ability
 *                to navigate them
 * bpmn-modeler - bootstraps a full-fledged BPMN editor
 */
import * as BpmnJS from 'bpmn-js/dist/bpmn-modeler.production.min.js';
import BpmnViewer from 'bpmn-js/lib/NavigatedViewer';

import { DiagramHttpService } from 'src/app/processes/services/diagram-http.service';

@Component({
  selector: 'app-diagram',
  templateUrl: 'diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements AfterContentInit, OnInit, OnDestroy {
  private bpmnJS: BpmnJS;
  private diagramUrl = 'https://cdn.staticaly.com/gh/bpmn-io/bpmn-js-examples/dfceecba/starter/diagram.bpmn';

  @ViewChild('ref', { static: true }) private el: ElementRef;

  constructor(
    private diagramHttpService: DiagramHttpService,
  ) {

    // this.bpmnJS = new BpmnJS();
    this.bpmnJS = new BpmnViewer();

    this.bpmnJS.on('import.done', ({ error }) => {
      if (!error) {
        this.bpmnJS.get('canvas').zoom('fit-viewport');
        const overlays = this.bpmnJS.get('overlays');

        overlays.add('sid-52EB1772-F36E-433E-8F5B-D5DFD26E6F26', 'note', {
          position: {
            bottom: 48,
            right: 48
          },
          html: '<div class="diagram-note">Mixed up the labels?</div>'
        });
      }
    });
  }

  ngAfterContentInit(): void {
    this.bpmnJS.attachTo(this.el.nativeElement);
  }

  ngOnInit() {
    this.loadDiagram(this.diagramUrl);
  }

  ngOnDestroy(): void {
    this.bpmnJS.destroy();
  }

  loadDiagram(url: string) {
    this.diagramHttpService.loadDiagram(url, this.bpmnJS)
  }
}
