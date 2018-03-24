import { Routes } from '@angular/router';

import { TemplatePageComponent } from './containers/template-page.component';

import { Template1Component } from './components/template-1.component';
import { Template2Component } from './components/template-2.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'template' },
  { path: 'template', component: TemplatePageComponent, children: [
    { path: 'canvas', component: Template1Component },
    { path: 'svg', component: Template2Component },
    { path: '', pathMatch: 'full', redirectTo: 'svg' },
  ] },
];
