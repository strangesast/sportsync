import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { BoardTemplate } from '../models/board-template.model';

@Injectable()
export class BoardTemplateService {

  getTemplate(id: string) {
    console.log(`waiting on ${ id }`);
    return this.http.get(`/api/templates/${ id }`) as Observable<BoardTemplate>;
  }

  getTemplates() {
    return this.http.get(`/api/templates`) as Observable<BoardTemplate[]>;
  }

  updateTemplate(template: BoardTemplate) {
    return this.http.post(`/api/templates`, template);
  }

  createNew(template?: BoardTemplate) {
    if (template == null) {
      template = { name: `New Template`, size: { width: 128, height: 32 }};
    }
    return this.http.post<BoardTemplate>(`/api/templates`, template);
  }

  constructor(private http: HttpClient) {}
}
