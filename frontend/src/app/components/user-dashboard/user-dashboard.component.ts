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

  nameError = '';
  emailError = '';

  errorMessage = '';
  successMessage = '';

  currentPassword = '';
  newPassword = '';
  confirmNewPassword = '';
  currentPasswordError = '';
  newPasswordError = '';
  confirmNewPasswordError = '';

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
    this.nameError = '';
    this.emailError = '';
    this.errorMessage = '';
    this.successMessage = '';
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.nameError = '';
    this.emailError = '';
    this.errorMessage = '';
    this.successMessage = '';
    this.loadUser();
  }

  saveChanges(): void {
    if (!this.user) {
      return;
    }

    this.validateName();
    this.validateEmail();

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isProfileFormValid()) {
      return;
    }

    this.isSaving = true;

    this.userService.updateCurrentUser({
      name: this.user.name.trim(),
      username: this.user.username,
      email: this.user.email.trim()
    }).subscribe(
      updatedUser => {
        this.user = updatedUser;
        this.isEditing = false;
        this.isSaving = false;
        this.nameError = '';
        this.emailError = '';
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
    this.validateCurrentPassword();
    this.validateNewPassword();
    this.validateConfirmNewPassword();

    this.errorMessage = '';
    this.successMessage = '';

    if (!this.isPasswordFormValid()) {
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
    this.currentPasswordError = '';
    this.newPasswordError = '';
    this.confirmNewPasswordError = '';
  }

  validateName(): void {
    if (!this.user || !this.user.name.trim()) {
      this.nameError = 'Name is required';
    } else {
      this.nameError = '';
    }
  }

  validateEmail(): void {
    if (!this.user || !this.user.email.trim()) {
      this.emailError = 'Email is required';
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(this.user.email)) {
      this.emailError = 'Please enter a valid email address';
    } else {
      this.emailError = '';
    }
  }

  isEmailValid(): boolean {
    if (!this.user) {
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return emailPattern.test(this.user.email.trim());
  }

  isProfileFormValid(): boolean {
    if (!this.user) {
      return false;
    }

    return (
      this.user.name.trim().length > 0 &&
      this.user.email.trim().length > 0 &&
      this.isEmailValid() &&
      !this.nameError &&
      !this.emailError
    );
  }

  validateCurrentPassword(): void {
    if (!this.currentPassword) {
      this.currentPasswordError = 'Current password is required';
    } else {
      this.currentPasswordError = '';
    }
  }

  validateNewPassword(): void {
    if (!this.newPassword) {
      this.newPasswordError = 'New password is required';
    } else if (this.newPassword.length < 8) {
      this.newPasswordError = 'Password must contain at least 8 characters';
    } else if (
      this.currentPassword &&
      this.newPassword === this.currentPassword
    ) {
      this.newPasswordError = 'The new password must be different from the current password';
    } else {
      this.newPasswordError = '';
    }
    if (this.confirmNewPassword) {
      this.validateConfirmNewPassword();
    }
  }

  validateConfirmNewPassword(): void {
    if (!this.confirmNewPassword) {
      this.confirmNewPasswordError = 'Please confirm your new password';
    } else if (this.newPassword !== this.confirmNewPassword) {
      this.confirmNewPasswordError = 'Passwords do not match';
    } else {
      this.confirmNewPasswordError = '';
    }
  }

  isPasswordFormValid(): boolean {
    return (
      this.currentPassword.length > 0 &&
      this.newPassword.length >= 8 &&
      this.confirmNewPassword.length > 0 &&
      this.newPassword === this.confirmNewPassword &&
      this.currentPassword !== this.newPassword &&
      !this.currentPasswordError &&
      !this.newPasswordError &&
      !this.confirmNewPasswordError
    );
  }

}
