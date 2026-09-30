import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    const allowedRoles: string[] = route.data['roles'];

    return new Promise((resolve) => {
      this.authService.getCurrentUser().subscribe(
        user => {
          this.authService.currentUser = user;

          if (allowedRoles.includes(user.role)) {
            resolve(true);
          } else {
            this.router.navigate(['/']);
            resolve(false);
          }
        },
        () => {
          this.router.navigate(['/login']);
          resolve(false);
        }
      );
    });
  }
}