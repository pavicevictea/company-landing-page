import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private apiUrl = 'http://localhost:8080/api/services';

  constructor(
    private http: HttpClient
) {}

  getAll(): Observable<ServiceItem[]> {
    return this.http.get<ServiceItem[]>(
      this.apiUrl,
      { withCredentials: true }
    );
  }

  getById(id: number): Observable<ServiceItem> {
    return this.http.get<ServiceItem>(
      `${this.apiUrl}/${id}`,
      { withCredentials: true }
    );
  }

  create(data: {
    title: string;
    description: string;
  }): Observable<ServiceItem> {
    return this.http.post<ServiceItem>(
      this.apiUrl,
      data,
      { withCredentials: true }
    );
  }

  update(
    id: number,
    data: {
      title: string;
      description: string;
    }
  ): Observable<ServiceItem> {
    return this.http.put<ServiceItem>(
      `${this.apiUrl}/${id}`,
      data,
      { withCredentials: true }
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      { withCredentials: true }
    );
  }
}