import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
  private url_API = 'http://localhost:8080/login';

  constructor(private http: HttpClient, private router: Router) {}



  setAuthenticatedState(userData?: Auth) {
    this.userDataSubject.next(userData);
    console.log(this.userDataSubject.value);    
  }

  private userDataSubject = new BehaviorSubject<Auth | undefined>(undefined);
  userData$ = this.userDataSubject.asObservable();

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.url_API}`;
    const body = { email, password };

    return this.http.post(loginUrl, body);
  }

  setUserRole(userInfo: any) {
    localStorage.setItem('user', JSON.stringify(userInfo));
  }

  getUserRole() {   
    return JSON.parse(localStorage.getItem('user') || '{}')
  }

  redirectToRoleSpecificScreen() {
    const userRole = this.getUserRole();
    if(userRole === 'waiter') {
      this.router.navigate(['/waiter'])
    }
  }

  clearUserRole() {
    localStorage.removeItem('user');
  }
}