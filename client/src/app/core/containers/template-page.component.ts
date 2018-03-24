import { Component } from '@angular/core';

@Component({
  selector: 'app-template-page',
  template: `
  <mat-toolbar>
    <span>Template Page</span>
  </mat-toolbar>
  <router-outlet></router-outlet>
  `,
  styles: []
})
export class TemplatePageComponent {
}
