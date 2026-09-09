import { ContactService } from './../../services/contact.service';
import { Component, OnInit } from '@angular/core';

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

  constructor(private ContactService: ContactService) { }

  ngOnInit() {
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
    
    this.ContactService.submitInquiry(inquiry).subscribe(
      () => {
        this.submitted = true;
        this.errorMessage = '';

        this.name = '';
        this.email = '';
        this.subject = '';
        this.message = '';
      },
      () => {
        this.submitted = false;
        this.errorMessage = 'Something went wrong. Please try again later.';
      }
    );
  }

}
