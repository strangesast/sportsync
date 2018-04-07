import { Routes } from '@angular/router';

import { TemplatePageComponent } from './containers/template-page.component';
import { TemplateListComponent } from './containers/template-list.component';

import { TemplatesLoadGuard } from './guards/templates-load.guard';
import { TemplateLoadGuard } from './guards/template-load.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'templates' },
  { path: 'templates', resolve: { templates: TemplatesLoadGuard }, component: TemplateListComponent },
  {
    path: 'templates/:id',
    canActivate: [TemplateLoadGuard],
    resolve: { template: TemplateLoadGuard },
    component: TemplatePageComponent
  },
];
