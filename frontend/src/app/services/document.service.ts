import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DocumentDto {
  id: number;
  originalFilename: string;
  contentType: string;
  size: number;
  uploadedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://localhost:8080/api/documents';

  constructor(private http: HttpClient) {}

  uploadDocument(file: File): Observable<DocumentDto> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<DocumentDto>(
      this.apiUrl,
      formData,
      {
        withCredentials: true
      }
    );
  }

  getDocuments(): Observable<DocumentDto[]> {
    return this.http.get<DocumentDto[]>(
      this.apiUrl,
      {
        withCredentials: true
      }
    );
  }

  downloadDocument(id: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/${id}/download`,
      {
        withCredentials: true,
        responseType: 'blob'
      }
    );
  }

  deleteDocument(id: number): Observable<void> {
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        withCredentials: true
      }
    );
  }
}