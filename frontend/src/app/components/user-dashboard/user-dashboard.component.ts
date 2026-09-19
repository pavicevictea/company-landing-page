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
  isChangingPassword = false;

  errorMessage = '';
  successMessage = '';

  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';

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
    this.isChangingPassword = false;
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.loadUser();
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

  startChangingPassword(): void {
    this.isEditing = false;
    this.isChangingPassword = true;
    this.clearPasswordFields();
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelChangingPassword(): void {
    this.isChangingPassword = false;
    this.clearPasswordFields();
    this.errorMessage = '';
    this.successMessage = '';
  }

  changePassword(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.currentPassword || !this.newPassword || !this.confirmNewPassword) {
      this.errorMessage = 'Please fill in all password fields.';
      return;
    }

    if (this.newPassword.length < 8) {
      this.errorMessage = 'The new password must contain at least 8 characters.';
      return;
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = 'The new passwords do not match.';
      return;
    }

    if (this.currentPassword === this.newPassword) {
      this.errorMessage =
        'The new password must be different from the current password.';
      return;
    }

    this.isSaving = true;

    this.userService.changePassword({
      currentPassword: this.currentPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.isSaving = false;
        this.isChangingPassword = false;
        this.clearPasswordFields();
        this.successMessage =
          'Your password has been changed successfully.';
      },
      error: error => {
        this.isSaving = false;
        if (error.status === 400) {
          this.errorMessage =
            'The current password is incorrect or the new password is invalid.';
        } else if (error.status === 401 || error.status === 403) {
          this.errorMessage =
            'Your session has expired. Please log in again.';
        } else {
          this.errorMessage =
            'Unable to change your password. Please try again.';
        }
      }
    });
  }

  private clearPasswordFields(): void {
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmNewPassword = '';
  }
}
