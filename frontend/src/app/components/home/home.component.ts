import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  dynamicSections: any[] = [];

  constructor(private contentService: ContentService) {}

  ngOnInit() {
    this.contentService.getAll().subscribe(
      (items) => { this.dynamicSections = items; },
      (err) => console.error(err)
    );
  }
}