import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationServiceService {
 // private url_API = 'http://localhost:8080/login';

private serverAPI = 'https://burger-queen-api-mock-puce.vercel.app/server.js'
  private url_API = 'https://burger-queen-api-mock-puce.vercel.app/login'
 accessToken: string | undefined = undefined;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<any> {
  //  const loginUrl = `${this.url_API}`;
  const loginUrl = `${this.serverAPI}`;
    const body = { email, password };
   // const serveer = this.getServer()
//    console.log(serveer);
  //  console.log(this.http.post(loginUrl, body));
    //return this.http.post(loginUrl, body);
return this.http.get(loginUrl)
  }

  // getServer(email: string, password: string): Observable<any> {
  //   const body = { email, password };
  //   return this.http.post(this.serverAPI, body);
  // }

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

