import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DocumentDto } from './document.service';

export type InquiryStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'RESOLVED';

export interface CustomerRequest {
    id: number;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: InquiryStatus;
    documents: DocumentDto[];
}

export interface RequestSearchParams {
  search?: string;
  status?: InquiryStatus | '';
  sort?: 'asc' | 'desc';
  attachments?: 'all' | 'with' | 'without';
}

export interface UserInquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: InquiryStatus;
  documents: DocumentDto[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private apiUrl = 'http://localhost:8080/api/contact';
    private adminRequestsUrl = 'http://localhost:8080/api/admin/requests';

    constructor(private http: HttpClient) {}

    submitInquiry(
        data: {
        name: string;
        email: string;
        subject: string;
        message: string;
        },
        file?: File
    ): Observable<any> {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        formData.append('subject', data.subject);
        formData.append('message', data.message);
        if (file) {
            formData.append('file', file);
        }
        return this.http.post(
            this.apiUrl,
            formData,
            {
                withCredentials: true
            }
        );
    }

    getCustomerRequests(
        filters: RequestSearchParams = {}
    ): Observable<CustomerRequest[]> {
        let params = new HttpParams();
        if (filters.search && filters.search.trim()) {
            params = params.set('search', filters.search.trim());
        }
        if (filters.status) {
            params = params.set('status', filters.status);
        }
        if (filters.sort) {
            params = params.set('sort', filters.sort);
        }
        if (filters.attachments) {
            params = params.set('attachments', filters.attachments);
        }
        return this.http.get<CustomerRequest[]>(
            this.adminRequestsUrl,
            {
                params,
                withCredentials: true
            }
        );
    }

    getCustomerRequest(id: number): Observable<CustomerRequest> {
        return this.http.get<CustomerRequest>(
        `${this.adminRequestsUrl}/${id}`,
        { withCredentials: true }
        );
    }

    updateRequestStatus(
        id: number,
        status: InquiryStatus
    ): Observable<CustomerRequest> {
        return this.http.patch<CustomerRequest>(
        `${this.adminRequestsUrl}/${id}/status`,
        { status },
        { withCredentials: true }
        );
    }

    getMyInquiries(): Observable<UserInquiry[]> {
        return this.http.get<UserInquiry[]>(
            `${this.apiUrl}/my`,
            {
                withCredentials: true
            }
        );
    }
}