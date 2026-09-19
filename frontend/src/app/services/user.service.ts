import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserProfile {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UserUpdateRequest {
  name: string;
  username: string;
  email: string;
}

export interface PasswordChangeRequest {
  currentPassword: string;
  newPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  getCurrentUser(): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      `${this.apiUrl}/me`,
      {
        withCredentials: true
      }
    );
  }

  updateCurrentUser(
    user: UserUpdateRequest
  ): Observable<UserProfile> {
    return this.http.put<UserProfile>(
      `${this.apiUrl}/me`,
      user,
      {
        withCredentials: true
      }
    );
  }

  changePassword(
    request: PasswordChangeRequest
  ): Observable<void> {
    return this.http.put<void>(
      `${this.apiUrl}/me/password`,
      request,
      { withCredentials: true }
    );
  }
}