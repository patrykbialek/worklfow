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
    return (
      this.http
        .get(url, { responseType: 'text' })
        .pipe(
          catchError(err => throwError(err)),
          importDiagram(bpmnJS)
        ).subscribe()
    );
  }
}