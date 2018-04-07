import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap } from 'rxjs/operators';

import { BoardTemplateService } from '../services/board-template.service';
import { BoardTemplate } from '../models/board-template.model';

@Injectable()
export class TemplatesLoadGuard implements CanActivate, Resolve<BoardTemplate[]> {

  constructor(private service: BoardTemplateService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return of(true);
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BoardTemplate[]> {
    return this.service.getTemplates().pipe(tap(t => console.log(`service got templates ${ t }`)));
  }
}
