import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
