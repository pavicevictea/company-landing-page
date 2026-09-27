import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}

export interface RequestSearchParams {
  search?: string;
  status?: InquiryStatus | '';
  sort?: 'asc' | 'desc';
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {

    private apiUrl = 'http://localhost:8080/api/contact';
    private adminRequestsUrl = 'http://localhost:8080/api/admin/requests';

    constructor(private http: HttpClient) {}

    submitInquiry(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
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
}