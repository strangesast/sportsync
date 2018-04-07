import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { exhaustMap, filter, pluck, tap, startWith, takeUntil } from 'rxjs/operators';

import { BoardTemplate } from '../models/board-template.model';
import { BoardTemplateService } from '../services/board-template.service';

@Component({
  selector: 'app-template-list',
  template: `
  <mat-toolbar>
    <span>Templates</span>
  </mat-toolbar>
  <mat-list *ngIf="templates$ | async as templates">
    <a
      mat-list-item
      *ngFor="let template of templates"
      [routerLink]="['/templates', template.id]">
      {{ template.name }}
    </a>
  </mat-list>
  <button mat-button (click)="creator$.next()">Create New</button>
  `,
  styles: [],
})
export class TemplateListComponent implements OnDestroy {

  destroyed$ = new Subject();

  creator$ = new Subject<BoardTemplate>();

  result$ = this.creator$.pipe(
    exhaustMap(template => this.service.createNew(template)),
    startWith(null)
  );

  templates$: Observable<BoardTemplate>;

  constructor(private route: ActivatedRoute, private service: BoardTemplateService, private router: Router) {
    this.templates$ = route.data.pipe(
      pluck('templates'),
    );

    this.result$.pipe(
      takeUntil(this.destroyed$),
      filter((res?: BoardTemplate) => res != null && res.id != null)
    ).subscribe(res => this.router.navigate(['/templates', res.id]));
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
