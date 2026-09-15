import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  aboutContent: any[] = [];

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentService.getBySection('about').subscribe(
      (items) => {
        this.aboutContent = items;
      },
      (error) => {
        console.error('Error loading about content:', error);
      }
    );
  }

}
