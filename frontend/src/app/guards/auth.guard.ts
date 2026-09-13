import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      this.authService.getCurrentUser().subscribe(
        () => {
          resolve(true);
        },
        () => {
          this.router.navigate(['/login']);
          resolve(false);
        }
      );
    });
  }
}