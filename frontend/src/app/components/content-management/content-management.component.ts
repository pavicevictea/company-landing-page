import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements OnInit {

  contentItems: any[] = [];

  editingId: number | null = null;
  editTitle = '';
  editContentText = '';

  isAddingNew = false;
  newTitle = '';
  newContentText = '';

  successMessage = '';
  errorMessage = '';

  constructor(
    private contentService: ContentService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadContent();
  }

  loadContent() {
    this.contentService.getAll().subscribe(
      (items) => { 
        this.contentItems = items; 
      },
      () => { 
        this.errorMessage = 'Failed to load content from database.'; 
      }
    );
  }

  getItemsBySection(section: string): any[] {
    return this.contentItems.filter(
      (item) => item.section === section
    );
  }

  startEdit(item: any) {
    this.editingId = item.id;
    this.editTitle = item.title;
    this.editContentText = item.content;
    this.isAddingNew = false;
  }

  cancelEdit() {
    this.editingId = null;
    this.editTitle = '';
    this.editContentText = '';
  }

  saveEdit(item: any) {
    if (!this.editTitle.trim() || !this.editContentText.trim()) {
      return;
    }
    this.contentService.update(
      item.id, 
      { 
        title: this.editTitle, 
        content: this.editContentText 
      }
    ).subscribe(
      () => {
        this.successMessage = 'Section updated.';
        this.errorMessage = '';
        this.cancelEdit();
        this.loadContent();
      },
      () => { 
        this.errorMessage = 'Failed to update section.'; 
      }
    );
  }

  saveNewSection() {
    if (!this.newTitle.trim() || !this.newContentText.trim()) {
      return;
    }
    this.contentService.create({ 
      title: this.newTitle, 
      content: this.newContentText 
    }).subscribe(
      () => {
        this.successMessage = 'New section published.';
        this.errorMessage = '';
        this.newTitle = '';
        this.newContentText = '';
        this.isAddingNew = false;
        this.loadContent();
      },
      () => { 
        this.errorMessage = 'Failed to add new section.'; 
      }
    );
  }

  deleteContent(id: number, title: string) {
    const confirmed = confirm(`Are you sure you want to delete section "${title}"?`);
    if (!confirmed) {
      return;
    }
    this.contentService.delete(id).subscribe(
      () => {
        this.successMessage = 'Section deleted.';
        this.errorMessage = '';
        this.loadContent();
      },
      () => { 
        this.errorMessage = 'Failed to delete section.'; 
      }
    );
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.scrollTo({ 
          top: 0, 
          behavior: 'smooth' });
      });
    });
  }
}