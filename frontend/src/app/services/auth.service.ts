import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/api/auth';

    currentUser: any = null;

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        return this.http.post(
            this.apiUrl + '/login',
            {
                username: username,
                password: password
            },
            {
                withCredentials: true
            }
        );
    }

    getCurrentUser(): Observable<any> {
        return this.http.get(
            this.apiUrl + '/me',
            {
                withCredentials: true
            }
        );
    }

    logout(): Observable<any> {
        this.currentUser = null;
        localStorage.removeItem('isLoggedIn');
        return this.http.post(
            this.apiUrl + '/logout',
            {},
            {
            withCredentials: true
            }
        );
    }

    isLoggedIn(): boolean {
        return !!localStorage.getItem('isLoggedIn');
    }

    register(
        name: string,
        username: string,
        email: string,
        password: string
    ): Observable<any> {
        return this.http.post(
            this.apiUrl + '/register',
            {
                name: name,
                username: username,
                email: email,
                password: password
            },
            {
                withCredentials: true
            }
        );
    }
}