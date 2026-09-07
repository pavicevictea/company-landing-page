import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  showMessage(event: Event) {
    event.preventDefault();
    alert('This is a demo contact form. No message will be sent');
  }

}
