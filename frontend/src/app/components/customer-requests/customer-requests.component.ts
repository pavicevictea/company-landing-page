import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService, CustomerRequest, InquiryStatus, RequestSearchParams } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-requests',
  templateUrl: './customer-requests.component.html',
  styleUrls: ['./customer-requests.component.css']
})
export class CustomerRequestsComponent implements OnInit {

  requests: CustomerRequest[] = [];
  selectedRequest: CustomerRequest | null = null;

  loading = false;
  updating = false;

  errorMessage = '';
  successMessage = '';

  statuses: InquiryStatus[] = [
    'PENDING',
    'IN_PROGRESS',
    'RESOLVED'
  ];

  selectedStatus: InquiryStatus = 'PENDING';

  searchTerm = '';
  filterStatus: InquiryStatus | '' = '';
  sortOrder: 'asc' | 'desc' = 'desc';

  constructor(
    private contactService: ContactService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  
  loadRequests(): void {
    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';
    
    const filters: RequestSearchParams = {
      search: this.searchTerm,
      status: this.filterStatus,
      sort: this.sortOrder
    };
    this.contactService.getCustomerRequests(filters).subscribe({
      next: (requests) => {
        this.requests = requests;
        this.loading = false;
        if (this.selectedRequest) {
          const selectedId = this.selectedRequest.id;
          const updatedSelectedRequest = requests.find(
            request => request.id === selectedId
          );
          if (updatedSelectedRequest) {
            this.selectedRequest = updatedSelectedRequest;
            this.selectedStatus = updatedSelectedRequest.status;
          } else {
            this.selectedRequest = null;
          }
        }
      },
      error: () => {
        this.errorMessage = 'Failed to load customer requests.';
        this.loading = false;
      }
    });
  }

  selectRequest(request: CustomerRequest): void {
    this.selectedRequest = request;
    this.selectedStatus = request.status;
    this.errorMessage = '';
    this.successMessage = '';
  }

  saveStatus(): void {
    if (!this.selectedRequest || this.updating) {
      return;
    }
    const requestId = this.selectedRequest.id;
    this.updating = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.contactService
      .updateRequestStatus(requestId, this.selectedStatus)
      .subscribe({
        next: (updatedRequest) => {
          this.requests = this.requests
            .map(request =>
              request.id === updatedRequest.id
                ? updatedRequest
                : request
            )
            .sort((a, b) => {
              const priority: { [key in InquiryStatus]: number } = {
                PENDING: 1,
                IN_PROGRESS: 2,
                RESOLVED: 3
              };
              return priority[a.status] - priority[b.status];
            });
          this.selectedRequest = updatedRequest;
          this.selectedStatus = updatedRequest.status;
          this.successMessage = 'Request status updated.';
          this.updating = false;
        },
        error: () => {
          this.errorMessage = 'Failed to update request status.';
          this.updating = false;
        }
      });
  }

  getStatusLabel(status: InquiryStatus): string {
    switch (status) {
      case 'PENDING':
        return 'Pending';
      case 'IN_PROGRESS':
        return 'In progress';
      case 'RESOLVED':
        return 'Resolved';
      default:
        return status;
    }
  }

  logout(): void {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/']).then(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      });
    });
  }

  onSearchChange(): void {
    this.loadRequests();
  }

  onFilterStatusChange(event: Event): void {
    this.filterStatus = (event.target as HTMLSelectElement).value as InquiryStatus | '';
    this.loadRequests();
  }

  onSortChange(event: Event): void {
    this.sortOrder = (event.target as HTMLSelectElement).value as 'asc' | 'desc';
    this.loadRequests();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterStatus = '';
    this.sortOrder = 'desc';
    this.selectedRequest = null;
    this.loadRequests();
  }
}