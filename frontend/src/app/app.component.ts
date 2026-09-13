import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  template: `
    <ng-container *ngIf="isHomeRoute">
      <app-navbar></app-navbar>
      <main>
        <app-hero></app-hero>
        <app-services></app-services>
        <app-about></app-about>
        <app-contact></app-contact>
        <app-dynamic-content></app-dynamic-content>
      </main>
      <app-footer></app-footer>
    </ng-container>

    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {
  title = 'company-landing-page';
  isHomeRoute = true;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).forEach((event: any) => {
      this.isHomeRoute = event.url === '/' || event.url === '';
    });
  }
}
