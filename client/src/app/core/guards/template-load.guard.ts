import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, tap } from 'rxjs/operators';

import { BoardTemplate } from '../models/board-template.model';
import { BoardTemplateService } from '../services/board-template.service';

@Injectable()
export class TemplateLoadGuard implements CanActivate, Resolve<BoardTemplate> {
  lastTemplate: BoardTemplate;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const id = route.params['id'];
    return this.service.getTemplate(id).pipe(
      tap(template => {
        if (template != null) {
          this.lastTemplate = template;
        }
      }),
      map(template => template != null),
    );
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoardTemplate> {
    return of(this.lastTemplate);
  }

  constructor(private service: BoardTemplateService, private router: Router) {}
}
