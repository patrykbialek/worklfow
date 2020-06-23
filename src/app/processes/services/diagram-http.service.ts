import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { throwError, } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

import { importDiagram } from './diagram-utils.service';

@Injectable({
  providedIn: 'root'
})
export class DiagramHttpService {
  constructor(
    private http: HttpClient,
  ) { }

  loadDiagram(url: string, bpmnJS: any) {
    const _url = 'assets/diagrams/ER0020_Formal_Verification.bpmn';
    return (
      this.http
        .get(_url, { responseType: 'text' })
        .pipe(
          catchError(err => throwError(err)),
          importDiagram(bpmnJS)
        ).subscribe()
    );
  }
}