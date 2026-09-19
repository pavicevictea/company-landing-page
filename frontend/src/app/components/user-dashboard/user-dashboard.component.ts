import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  user: UserProfile | null = null;

  isEditing = false;
  isLoading = true;
  isSaving = false;

  errorMessage = '';
  successMessage = '';

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.userService.getCurrentUser().subscribe(
      user => {
        this.user = user;
        this.isLoading = false;
      },
      () => {
        this.errorMessage = 'Unable to load your account information.';
        this.isLoading = false;
      }
    );
  }

  startEditing(): void {
    this.isEditing = true;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  saveChanges(): void {
    if (!this.user) {
      return;
    }

    if (!this.user.name.trim() || !this.user.email.trim()) {
      this.errorMessage = 'Name and email are required.';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';
    this.successMessage = '';

    this.userService.updateCurrentUser({
      name: this.user.name.trim(),
      username: this.user.username,
      email: this.user.email.trim()
    }).subscribe(
      updatedUser => {
        this.user = updatedUser;
        this.isEditing = false;
        this.isSaving = false;
        this.successMessage = 'Your account information has been updated.';
      },
      error => {
        this.isSaving = false;

        if (error.status === 400) {
          this.errorMessage = 'Please enter valid account information.';
        } else if (error.status === 409) {
          this.errorMessage = 'This email address is already registered.';
        } else {
          this.errorMessage = 'Unable to update your account information.';
        }
      }
    );
  }

}
