import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService, CustomerRequest, InquiryStatus, RequestSearchParams } from '../../services/contact.service';
import { AuthService } from '../../services/auth.service';
import { DocumentDto, DocumentService } from 'src/app/services/document.service';

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
  attachmentFilter: 'all' | 'with' | 'without' = 'all';

  constructor(
    private contactService: ContactService,
    public authService: AuthService,
    private router: Router,
    private documentService: DocumentService
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
      sort: this.sortOrder,
      attachments: this.attachmentFilter
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

  onAttachmentFilterChange(event: Event): void {
    this.attachmentFilter = (event.target as HTMLSelectElement).value as 'all' | 'with' | 'without';
    this.loadRequests();
  }

  resetFilters(): void {
    this.searchTerm = '';
    this.filterStatus = '';
    this.sortOrder = 'desc';
    this.attachmentFilter = 'all';
    this.selectedRequest = null;
    this.loadRequests();
  }

  downloadDocument(file: DocumentDto): void {
    this.documentService.downloadDocument(file.id).subscribe(
      blob => {
        const url = window.URL.createObjectURL(blob);
        const link = window.document.createElement('a');
        link.href = url;
        link.download = file.originalFilename;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      () => {
        this.errorMessage = 'Unable to download the document.'
      }
    );
  }

}