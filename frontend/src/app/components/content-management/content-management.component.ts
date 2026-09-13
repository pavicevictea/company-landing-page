import { Component, OnInit } from '@angular/core';
import { ContentService } from 'src/app/services/content.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-content-management',
  templateUrl: './content-management.component.html',
  styleUrls: ['./content-management.component.css']
})
export class ContentManagementComponent implements OnInit {

  contentItems: any[] = [];

  title = '';
  content = '';

  editingId: number | null = null;

  successMessage = '';
  errorMessage = '';

  constructor(
    private contentService: ContentService,
    private authService: AuthService
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
        this.errorMessage = 'Unable to load content.';
      }
    );
  }

  saveContent() {
    if (!this.title.trim() || !this.content.trim()) {
      return;
    }

    const data = {
      title: this.title,
      content: this.content
    };

    if (this.editingId === null) {
      this.contentService.create(data).subscribe(
        () => {
          this.successMessage = 'Content added successfully.';
          this.resetForm();
          this.loadContent();
        },
        () => {
          this.errorMessage = 'Unable to add content.';
        }
      );
    } else {
      this.contentService.update(this.editingId, data).subscribe(
        () => {
          this.successMessage = 'Content updated successfully.';
          this.resetForm();
          this.loadContent();
        },
        () => {
          this.errorMessage = 'Unable to update content.';
        }
      );
    }
  }

  editContent(item: any) {
    this.editingId = item.id;
    this.title = item.title;
    this.content = item.content;
  }

  deleteContent(id: number) {
    this.contentService.delete(id).subscribe(
      () => {
        this.successMessage = 'Content deleted successfully.';
        this.loadContent();
      },
      () => {
        this.errorMessage = 'Unable to delete content.';
      }
    );
  }

  resetForm() {
    this.title = '';
    this.content = '';
    this.editingId = null;
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        window.location.href = '/login';
      }
    );
  }
}
