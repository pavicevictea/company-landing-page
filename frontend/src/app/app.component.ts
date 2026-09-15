import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AppComponent implements OnInit{
  title = 'company-landing-page';

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.getCurrentUser().subscribe(
      user => {
        this.authService.currentUser = user;
      },
      () => {
        this.authService.currentUser = null;
      }
    );
  }
}
