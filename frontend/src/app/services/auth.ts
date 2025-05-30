import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  constructor(private http: HttpClient) {}
  private url = 'http://localhost:5000/api/auth';
  login(email: string, password: string) {
    return this.http.post(`${this.url}/login`, { email, password });
  }
  register(user: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return this.http.post(`${this.url}/register`, user);
  }
}
