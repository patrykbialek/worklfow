import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  Modeler, OriginalPropertiesProvider, PropertiesPanelModule,
  InjectionNames, OriginalPaletteProvider
} from 'src/app/bpmn-js/bpmn-js';
import { CustomPropsProvider } from 'src/app/props-provider/CustomPropsProvider';
import { CustomPaletteProvider } from 'src/app/props-provider/CustomPaletteProvider';


const customModdle = {
  name: "customModdle",
  uri: "http://example.com/custom-moddle",
  prefix: "custom",
  xml: {
    tagAlias: "lowerCase"
  },
  associations: [],
  types: [
    {
      "name": "ExtUserTask",
      "extends": [
        "bpmn:UserTask"
      ],
      "properties": [
        {
          "name": "worklist",
          "isAttr": true,
          "type": "String"
        }
      ]
    },
  ]
};

const dd = ''
@Component({
  selector: 'app-diagram',
  templateUrl: './diagram.component.html',
  styleUrls: ['./diagram.component.scss']
})
export class DiagramComponent implements OnInit {

  viewer: any;
  title: string = 'Angular 2 with BPMN-JS';
  modeler;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.viewer = new Modeler({
      container: '#canvas',
      width: '100%',
      height: '600px',
      propertiesPanel: {
        parent: '#properties'
      },
      additionalModules: [
        PropertiesPanelModule,

        // Re-use original bpmn-properties-module, see CustomPropsProvider
        { [InjectionNames.bpmnPropertiesProvider]: ['type', OriginalPropertiesProvider.propertiesProvider[1]] },
        { [InjectionNames.propertiesProvider]: ['type', CustomPropsProvider] },

        // Re-use original palette, see CustomPaletteProvider
        { [InjectionNames.originalPaletteProvider]: ['type', OriginalPaletteProvider] },
        { [InjectionNames.paletteProvider]: ['type', CustomPaletteProvider] },
      ],
    });
    //   propertiesPanel: {
    //     parent: '#properties'
    //   },
    //   moddleExtension: {
    //     custom: customModdle
    //   }
    // });
    this.loadSampleBPMN();
  }

  handleError(err: any) {
    if (err) {
      console.log('error rendering', err);
    } else {
      console.log('rendered');
    }
  }

  loadSampleBPMN() {
    const url = '/assets/diagrams/ER0020_Formal_Verification.bpmn';
    this.http.get(url, {
      headers: { observe: 'response' }, responseType: 'text'
    }).subscribe(
      (data: any) => {
        this.viewer.importXML(data);
      },
      this.handleError
    );
  }


}
