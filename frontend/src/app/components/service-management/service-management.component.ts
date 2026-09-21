import { Component, OnInit } from '@angular/core';
import { ServiceService, ServiceItem } from 'src/app/services/service.service';

@Component({
  selector: 'app-service-management',
  templateUrl: './service-management.component.html',
  styleUrls: ['./service-management.component.css']
})
export class ServiceManagementComponent implements OnInit {

  services: ServiceItem[] = [];

  editingId: number | null = null;

  title = '';
  description = '';
  isAdding = false;

  constructor(
    private serviceService: ServiceService
  ) { }

  ngOnInit(): void {
    this.loadServices();
  }

  loadServices(): void {
    this.serviceService.getAll().subscribe({
      next: (services) => {
        this.services = services;
      },
      error: (error) => {
        console.error('Error loading services:', error);
      }
    });
  }

  startCreate(): void {
    this.isAdding = true;
    this.editingId = null;
    this.title = '';
    this.description = '';
  }

  startEdit(service: ServiceItem): void {
    this.isAdding = false;
    this.editingId = service.id;
    this.title = service.title;
    this.description = service.description;
  }

  cancelEdit(): void {
    this.isAdding = false;
    this.editingId = null;
    this.title = '';
    this.description = '';
  }

  saveService(): void {
    if (!this.title.trim() || !this.description.trim()) {
      return;
    }
    const data = {
      title: this.title.trim(),
      description: this.description.trim()
    };
    if (this.editingId === null) {
      this.serviceService.create(data).subscribe({
        next: () => {
          this.loadServices();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error creating service:', error);
        }
      });
    } else {
      this.serviceService.update(this.editingId, data).subscribe({
        next: () => {
          this.loadServices();
          this.cancelEdit();
        },
        error: (error) => {
          console.error('Error updating service:', error);
        }
      });
    }
  }

  deleteService(id: number): void {
    const confirmed = confirm('Are you sure you want to delete this service?');
    if (!confirmed) {
      return;
    }
    this.serviceService.delete(id).subscribe({
      next: () => {
        this.loadServices();

        if (this.editingId === id) {
          this.cancelEdit();
        }
      },
      error: (error) => {
        console.error('Error deleting service:', error);
      }
    });
  }

}
