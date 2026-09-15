import { ContentService } from 'src/app/services/content.service';
import { Component, IterableDiffers, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  heroContent: any = null;

  constructor(
    private contentService: ContentService
  ) { }

  ngOnInit() {
    this.contentService.getBySection('hero').subscribe(
      (items) => {
        if (items.length > 0) {
          this.heroContent = items[0];
        }
      },
      (error) => {
        console.error('Error loading hero content:', error);
      }
    );
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }

}
