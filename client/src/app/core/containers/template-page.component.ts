import { Component } from '@angular/core';

@Component({
  selector: 'app-template-page',
  template: `
  <mat-toolbar>
    <span>Template Page</span>
  </mat-toolbar>
  <app-template-form></app-template-form>
  `,
  styles: []
})
export class TemplatePageComponent {
}
