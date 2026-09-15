import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  services: any[] = [];

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentService.getBySection('services').subscribe(
      (items) => {
        this.services = items;
      },
      (error) => {
        console.error('Error loading services:', error);
      }
    );
  }

}
