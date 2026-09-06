import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <app-hero></app-hero>
    <app-services></app-services>
    <app-about></app-about>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'company-landing-page';
}
