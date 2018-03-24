import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <mat-sidenav-container>
    <mat-sidenav></mat-sidenav>
    <mat-sidenav-content>
      <router-outlet></router-outlet>
    </mat-sidenav-content>
  </mat-sidenav-container>
  `,
  styles: []
})
export class AppComponent {
  constructor() {}
}
