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
    if(!this.username.trim()){
      this.usernameError = 'Username is required';
    } else {
      this.usernameError = '';
    }
  }

  validateEmail() {
    if (!this.email.trim()) {
      this.emailError = 'Email is required';
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailPattern.test(this.email)){
      this.emailError = 'Please enter a valid email address';
    } else {
      this.emailError = '';
    }
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
      this.email.trim().length > 0 &&
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

        this.router.navigate(['/login']);
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
