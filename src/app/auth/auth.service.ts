import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Admin } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {

  //URLS
  private loginUrl = 'https://restaurantapi.bssoln.com/api/Auth/SignIn';

  // User data and token management
  // public currentUserSubject = new BehaviorSubject<Admin | null>(this.getUserFromStorage());
  // public currentUser$ = this.currentUserSubject.asObservable();

  private currentUser: Admin | null = null;

  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<Admin | null>(this.getUserFromStorage());
    this.loadUserFromStorage();
  }


  // constructor(private http: HttpClient) {}

  //login
  // login(userName: string, password: string): Observable<any> {
  //   const body = { userName, password };
  //   return this.http.post<any>(this.loginUrl, body).pipe(
  //     tap(response => {

  //       this.clearUserData();

  //       // Store token and user data in localStorage
  //       localStorage.setItem('token', response.token);
  //       localStorage.setItem('user', JSON.stringify(response.user));
  //       this.currentUserSubject.next(response.user);
  //     })
  //   );
  // }
  login(userName: string, password: string): Observable<any> {

    // Prepare the headers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  // Typical headers, can be modified
      'Access-Control-Allow-Origin': '*',  // Allow CORS (this is usually controlled by the server)
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',  // Headers allowed (if needed)
      'Authorization': 'Bearer your-token-if-applicable'  // If you need authorization token for CORS API
    });
    const body = { userName, password };
    return this.http.post<any>(this.loginUrl, body, { headers }).pipe(
      tap(response => {
        // Store token and user data in localStorage
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        this.currentUser = response.user; // Update the current user
      })
    );
  }

  logout(): void {
    // Clear localStorage or any stored user data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUser = null; // Reset the current user
  }

  getCurrentUser(): Admin | null {
    return this.currentUser;
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      this.currentUser = JSON.parse(userJson);
    }
  }

  // private getUserFromStorage(): Admin | null {
  //   const userJson = localStorage.getItem('user');
  //   return userJson ? JSON.parse(userJson) : null;
  // }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // private clearUserData() {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('user');
  // }



}
