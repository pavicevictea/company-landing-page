import { Component, OnInit } from '@angular/core';
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
  
  errorMessage = ''
  successMessage = '';

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  register() {
    this.errorMessage = '';
    this.successMessage = '';

    if(this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
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
