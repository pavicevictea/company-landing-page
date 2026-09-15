import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {

  private apiUrl = 'http://localhost:8080/api/content';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl,
      { withCredentials: true }
    );
  }

  getBySection(section: string): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl + '/section/' + section,
      { withCredentials: true }
    );
  }

  create(data: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      data,
      { withCredentials: true }
    );
  }

  update(id: number, data: any): Observable<any> {
    return this.http.put(
      this.apiUrl + '/' + id,
      data,
      { withCredentials: true }
    );
  }

  delete(id: number): Observable<any> {
    return this.http.delete(
      this.apiUrl + '/' + id,
      { withCredentials: true }
    );
  }
}