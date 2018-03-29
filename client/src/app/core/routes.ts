import { Routes } from '@angular/router';

import { TemplatePageComponent } from './containers/template-page.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'template' },
  { path: 'template', component: TemplatePageComponent },
];
