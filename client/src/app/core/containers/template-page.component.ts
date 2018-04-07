import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { concatMap, pluck } from 'rxjs/operators';

import { BoardTemplate } from '../models/board-template.model';
import { BoardTemplateService } from '../services/board-template.service';

@Component({
  selector: 'app-template-page',
  template: `
  <mat-toolbar>
    <span>Template Page</span>
  </mat-toolbar>
  <app-template-form [template]="template$ | async" (change)="templateChanged($event)"></app-template-form>
  <pre>{{ results$ | async | json }}</pre>
  `,
  styles: []
})
export class TemplatePageComponent {

  updates$ = new Subject<BoardTemplate>();

  results$ = this.updates$.pipe(
    concatMap(template => this.service.updateTemplate(template))
  );

  template$ = this.route.data.pipe(
    pluck('template'),
  );

  constructor(private service: BoardTemplateService, private route: ActivatedRoute) {}

  templateChanged(value) {
    console.log('changed to', value);
    this.updates$.next(value);
  }
}
