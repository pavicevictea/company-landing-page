import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/api/auth';

    constructor(private http: HttpClient) {}

    login(username: string, password: string): Observable<any> {
        const body = new HttpParams()
            .set('username', username)
            .set('password', password);

        return this.http.post(
            this.apiUrl + '/login',
            body.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
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
        return this.http.post(
            this.apiUrl + '/logout',
            {},
            {
            withCredentials: true
            }
        );
    }
}