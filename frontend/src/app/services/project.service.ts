import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ProjectUser {
  id: number;
  name: string;
  username: string;
  email: string;
  role: string;
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
  client: ProjectUser;
  teamMembers: ProjectUser[];
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/api/projects';

  constructor(
    private http: HttpClient
  ) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(
      this.apiUrl,
      { withCredentials: true }
    );
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(
      this.apiUrl + '/' + id,
      { withCredentials: true }
    );
  }

  getClients(): Observable<ProjectUser[]> {
    return this.http.get<ProjectUser[]>(
      this.apiUrl + '/clients',
      { withCredentials: true }
    );
  }

  getEmployees(): Observable<ProjectUser[]> {
    return this.http.get<ProjectUser[]>(
      this.apiUrl + '/employees',
      { withCredentials: true }
    );
  }

  createProject(project: any): Observable<Project> {
    return this.http.post<Project>(
      this.apiUrl,
      project,
      { withCredentials: true }
    );
  }

  updateProject(id: number, project: any): Observable<Project> {
    return this.http.put<Project>(
      this.apiUrl + '/' + id,
      project,
      { withCredentials: true }
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(
      this.apiUrl + '/' + id,
      { withCredentials: true }
    );
  }

  updateStatus(id: number, status: string): Observable<Project> {
    const params = new HttpParams().set('status', status);

    return this.http.patch<Project>(
      this.apiUrl + '/' + id + '/status',
      {},
      {
        params: params,
        withCredentials: true
      }
    );
  }
}