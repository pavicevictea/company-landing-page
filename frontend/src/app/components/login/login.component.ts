import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username = ''
  password = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }

  login(event: Event) {
    event.preventDefault();

    this.errorMessage = '';

    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['/admin/content']);
        },
        () => {
          this.errorMessage = 'Invalid username or password.';
        }
      );
  }
}