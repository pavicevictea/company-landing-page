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

  constructor() { }

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
    
    this.name = '';
    this.email = '';
    this.subject = '';
    this.message = '';
  }

}
