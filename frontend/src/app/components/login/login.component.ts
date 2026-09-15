import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  usernameError = '';
  passwordError = '';
  successRegistrationMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params['registered'] === 'true') {
          this.successRegistrationMessage = 'Registration successful. You can now log in.'
        }
      }
    )
  }

  validateUsername() {
    if (!this.username.trim()) {
      this.usernameError = 'Username is required';
    } else {
      this.usernameError = '';
    }
  }

  validatePassword() {
    if (!this.password.trim()) {
      this.passwordError = 'Password is required';
    } else {
      this.passwordError = '';
    }
  }

  isFormValid(): boolean {
    return (
      this.username.trim().length > 0 &&
      this.password.length >0
    );
  }

  login(event: Event) {
    this.validateUsername();
    this.validatePassword();
    event.preventDefault();

    this.errorMessage = '';

    if (!this.isFormValid()) {
      this.errorMessage = 'Please enter your username and password';
      return;
    }

    this.authService.login(this.username, this.password)
      .subscribe(
        () => {
          localStorage.setItem('isLoggedIn', 'true');
          this.authService.getCurrentUser().subscribe(
            user => {

              this.authService.currentUser = user;

              if (user.role === 'ADMIN') {
                this.router.navigate(['/admin/content']);
              } else {
                this.router.navigate(['/']);
              }
            },
            () => {
              this.errorMessage =
                'Unable to load user information.';
            }
          );
        },
        () => {
          this.errorMessage =
            'Invalid username or password.';
        }
      );
  }
}