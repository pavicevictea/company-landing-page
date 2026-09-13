import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';

@Component({
  selector: 'app-dynamic-content',
  templateUrl: './dynamic-content.component.html',
  styleUrls: ['./dynamic-content.component.css']
})
export class DynamicContentComponent implements OnInit {

  contentItems: any[] = [];

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit(): void {
    this.contentService.getAll().subscribe({
      next: (data) => (this.contentItems = data),
      error: (err) => console.error('Error while loading:', err)
    });
  }

}
