import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name = '';
  username ='';
  email = '';
  password = '';
  confirmPassword ='';

  nameError = '';
  usernameError = '';
  emailError = '';
  passwordError = '';
  confirmPasswordError = '';
  
  errorMessage = ''
  successMessage = '';

  usernameAvailable = false;
  usernameChecking = false;
  usernameChecked = false;
  emailAvailable = false;
  emailChecking = false;
  emailChecked = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  validateName() {
    if (!this.name.trim()) {
      this.nameError = 'Name is required';
    } else {
      this.nameError = '';
    }
  }

  validateUsername() {
    this.usernameChecked = false;
    this.usernameAvailable = false;

    if (!this.username.trim()) {
      this.usernameError = 'Username is required';
      return;
    }

    this.usernameError = '';
    this.usernameChecking = true;

    this.authService.checkUsername(this.username.trim()).subscribe(
      available => {
        this.usernameChecking = false;
        this.usernameChecked = true;
        this.usernameAvailable = available;
        if (!available) {
          this.usernameError = 'Username is already taken';
        }
      },
      () => {
        this.usernameChecking = false;
        this.usernameChecked = false;
        this.usernameAvailable = false;
        this.usernameError = 'Unable to check username availability';
      }
    );
  }

  validateEmail() {
    this.emailChecked = false;
    this.emailAvailable = false;

    if (!this.email.trim()) {
      this.emailError = 'Email is required';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.email)) {
      this.emailError = 'Please enter a valid email address';
      return;
    }

    this.emailError = '';
    this.emailChecking = true;

    this.authService.checkEmail(this.email.trim()).subscribe(
      available => {
        this.emailChecking = false;
        this.emailChecked = true;
        this.emailAvailable = available;
        if (!available) {
          this.emailError =
            'This email is already associated with an existing account';
        }
      },
      () => {
        this.emailChecking = false;
        this.emailChecked = false;
        this.emailAvailable = false;
        this.emailError = 'Unable to check email availability';
      }
    );
  }

  validatePassword() {
    if (!this.password) {
      this.passwordError = 'Password is required';
    } else if (this.password.length < 8) {
      this.passwordError = 'Password must contain at least 8 characters';
    } else {
      this.passwordError = '';
    }
    this.validateConfirmPassword();
  }

  validateConfirmPassword() {
    if (!this.confirmPassword) {
      this.confirmPasswordError = 'Please confirm your password';
    } else if (this.password != this.confirmPassword) {
      this.confirmPasswordError = 'Passwords do not match';
    } else {
      this.confirmPasswordError = '';
    }
  }

  isFormValid(): boolean {
    return (
      this.name.trim().length > 0 &&
      this.username.trim().length > 0 &&
      this.usernameChecked &&
      this.usernameAvailable &&
      this.email.trim().length > 0 &&
      this.emailChecked &&
      this.emailAvailable &&
      this.isEmailValid() &&
      this.password.length >= 8 &&
      this.confirmPassword.length > 0 &&
      this.password === this.confirmPassword
    );
  }

  isEmailValid(): boolean {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(this.email);
  }

  register() {
    this.validateName();
    this.validateUsername();
    this.validateEmail();
    this.validatePassword();
    this.validateConfirmPassword();

    this.errorMessage = '';
    this.successMessage = '';
    
    if (!this.isFormValid()) {
      return;
    }

    this.authService.register(
      this.name,
      this.username,
      this.email,
      this.password
    ).subscribe(
      () => {
        this.successMessage = 'Registration successful';
        this.name = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.confirmPassword = '';

        this.nameError = '';
        this.usernameError = '';
        this.emailError = '';
        this.passwordError = '';
        this.confirmPasswordError = '';

        this.router.navigate(['/login'], {
          queryParams: { registered: 'true' }
        });
      },
      error => {
        if (error.error && error.error.message) {
          this.errorMessage = error.error.message;
        } else {
          this.errorMessage = 'Registration failed';
        }
      }
    );
  }

}
