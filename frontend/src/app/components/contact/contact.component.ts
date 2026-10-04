import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';
import { UserProfile, UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name: string = '';
  email: string = '';
  subject: string = '';
  message: string = '';

  submitted = false;
  errorMessage = '';

  selectedFile: File | null = null;
  isLoggedIn = false;
  currentUser: UserProfile | null = null;

  constructor(
    private ContactService: ContactService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.userService.getCurrentUser().subscribe(
      user => {
        this.currentUser = user;
        this.isLoggedIn = true;
        this.name = user.name;
        this.email = user.email;
      },
      () => {
        this.currentUser = null;
        this.isLoggedIn = false;
      }
    );
  }

  onNameInput(event: any) {
    this.name = event.target.value;
  }

  onEmailInput(event: any) {
    this.email = event.target.value;
  }

  onSubjectInput(event: any) {
    this.subject = event.target.value;
  }

  onMessageInput(event: any) {
    this.message = event.target.value;
  }

  get isFormValid(): boolean {
    return this.name.trim() !== '' && this.email.trim() !== '' && this.subject.trim() !== '' && this.message.trim() !== '';
  }

  showMessage(event: Event) {
    event.preventDefault();
    if (!this.isFormValid) return;

    const inquiry = {
      name: this.name,
      email: this.email,
      subject: this.subject,
      message: this.message
    };
  
    this.ContactService.submitInquiry(
      inquiry,
      this.selectedFile || undefined
    ).subscribe(
      () => {
        this.submitted = true;
        this.errorMessage = '';
        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
        this.selectedFile = null;

        if (!this.isLoggedIn) {
          this.name = '';
          this.email = '';
        }

        const fileInput = document.getElementById(
          'file'
        ) as HTMLInputElement | null;
        if (fileInput) {
          fileInput.value = '';
        }
      },
      (error) => {
        this.submitted = false;
        this.errorMessage = (error.error && error.error.error) || 'Something went wrong. Please try again later.';
      }
    );
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files && files.length > 0) {
      this.selectedFile = files[0];
    } else {
      this.selectedFile = null;
    }
  }

}
