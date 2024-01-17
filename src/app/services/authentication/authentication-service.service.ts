import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
 private url_API = 'http://localhost:8080/login';
  
  //private url_API = 'http://localhost:3000/users';
  
 accessToken: string | undefined = undefined;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
    const loginUrl = `${this.url_API}`;
    const body = { email, password };
    return this.http.post(loginUrl, body);
    //return this.http.get(loginUrl);
  }

  setUserRole(userRole: string | undefined) {
    localStorage.setItem('user', JSON.stringify(userRole));
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

  getToken(token : string | undefined) {
    this.accessToken = token;
   return this.accessToken;
  }

  clearUserRole() {
    localStorage.removeItem('user');
  }
}

