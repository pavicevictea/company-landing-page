import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-navbar></app-navbar>
    <main>
      <app-hero></app-hero>
      <app-services></app-services>
      <app-about></app-about>
      <app-contact></app-contact>
    </main>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'company-landing-page';
}
